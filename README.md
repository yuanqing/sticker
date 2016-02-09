# sticker [![npm Version](http://img.shields.io/npm/v/sticker.svg?style=flat)](https://www.npmjs.com/package/sticker) [![Build Status](https://img.shields.io/travis/yuanqing/sticker.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/sticker)

> Effortless sticky DOM elements.

## Example

```
$ git clone https://github.com/yuanqing/sticker
$ npm install
$ npm install --global gulp
$ gulp example --open
```

## API

```js
import sticker from 'sticker';
```

### sticker(element [, options])

- `element` &mdash; A DOM element.

- `options` &mdash; An optional object literal:

  Key | Description | Default
  :--|:--|:--
  `containerElement` | The DOM element that contains `element` | `null`
  `stickyAboveViewportClassName` | Class name to add to `element` when it is &ldquo;sticky&rdquo; and *above* the viewport | `sticker--sticky-above-viewport`
  `stickyClassName` | Class name to add to `element` when it is &ldquo;sticky&rdquo; and *within* the viewport | `sticker--sticky`
  `topOffset` | The scroll offset at which the `element` becomes &ldquo;sticky&rdquo; | `0`

## Installation

Install via [npm](https://npmjs.com):

```
$ npm i --save sticker
```

## License

[MIT](LICENSE.md)
