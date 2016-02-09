import sticker from '../src';

sticker(document.querySelector('.masthead__inner'), {
  stickyClassName: 'masthead__inner--sticky',
  stickyAboveViewportClassName: 'masthead__inner--sticky-above-viewport',
  topOffset: 50
});

sticker(document.querySelector('.sidebar__inner'), {
  containerElement: document.querySelector('.container'),
  stickyClassName: 'sidebar__inner--sticky',
  stickyAboveViewportClassName: 'sidebar__inner--sticky-above-viewport',
  topOffset: 50
});
