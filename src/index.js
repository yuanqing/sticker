import sharedEventListeners from 'shared-event-listeners';

const NOT_STICKY = 0;
const STICKY = 1;
const STICKY_ABOVE_VIEWPORT = 2;

function noop() {}

export default (element, options = {}) => {

  // Exit if `element` is the tallest element in `containerElement`.
  const containerElement = options.containerElement || null;
  if (containerElement && element.offsetHeight >= containerElement.offsetHeight) {
    return noop;
  }

  // Default `options`.
  const stickyClassName = options.stickyClassName || 'sticker--sticky';
  const stickyAboveViewportClassName = options.stickyAboveViewportClassName || 'sticker--sticky-above-viewport';
  const topOffset = options.topOffset || 0;

  // Recompute dimensions on every `resize` event.
  let windowInnerHeight;
  let stickyHeight;
  let containerOffsetBottom;
  function recomputeDimensions() {
    windowInnerHeight = window.innerHeight;
    stickyHeight = `${windowInnerHeight - topOffset}px`;
    if (containerElement) {
      containerOffsetBottom = containerElement.offsetTop + containerElement.offsetHeight;
    }
  }
  recomputeDimensions();

  // Cache some frequently used properties.
  const elementStyle = element.style;
  const elementClassList = element.classList;

  // Force immediate repaint when changing `position` to `fixed` on iOS. See:
  // http://stackoverflow.com/questions/32875046/ios-9-safari-changing-an-element-to-fixed-position-while-scrolling-wont-paint
  elementStyle.transform = 'translate3d(0,0,0)';

  // Helper for setting the `element` height.
  function setElementHeight(height) {
    if (containerElement) {
      elementStyle.height = height;
    }
  }

  // Callback for changing the sticky state on scroll.
  let state = NOT_STICKY;
  function stick() {
    const windowScrollY = window.scrollY;
    const isSticky = windowScrollY > topOffset;
    if (isSticky) {
      const isStickyAboveViewport = containerElement && windowInnerHeight + windowScrollY >= containerOffsetBottom;
      if (isStickyAboveViewport) {
        if (state !== STICKY_ABOVE_VIEWPORT) {
          elementClassList.remove(stickyClassName);
          elementClassList.add(stickyAboveViewportClassName);
          elementStyle.position = 'absolute';
          state = STICKY_ABOVE_VIEWPORT;
          setElementHeight(stickyHeight);
        }
      } else {
        if (state !== STICKY) {
          elementClassList.add(stickyClassName);
          elementClassList.remove(stickyAboveViewportClassName);
          elementStyle.position = 'fixed';
          state = STICKY;
          setElementHeight(stickyHeight);
        }
      }
    } else {
      if (state !== NOT_STICKY) {
        elementClassList.remove(stickyClassName);
        elementClassList.remove(stickyAboveViewportClassName);
        elementStyle.position = 'relative';
        state = NOT_STICKY;
        setElementHeight('auto');
      }
    }
  }
  stick();

  // Bind listeners.
  const eventListeners = sharedEventListeners(window);
  eventListeners.add('scroll', stick);
  eventListeners.add('resize', recomputeDimensions);

  // Return a function for removing the bound listeners.
  return () => {
    eventListeners.remove('scroll', stick);
    eventListeners.remove('resize', recomputeDimensions);
  };

};
