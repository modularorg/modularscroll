<p align="center">
    <a href="https://github.com/modularbp/modular-boilerplate">
        <img src="https://user-images.githubusercontent.com/4596862/37635200-aa3271b2-2bd0-11e8-8a65-9cafa0addd67.png" height="140">
    </a>
</p>
<h1 align="center">modularScroll</h1>
<p align="center">Dead simple elements in viewport detection.</p>

## Installation
```sh
npm install modularscroll
```

## Why
- Simple
- Lightweight
- High performance
- No dependencies

## Usage
```js
import modularScroll from 'modularscroll';

this.scroll = new modularScroll();
```
```html
<h1 data-scroll>Hello</h1>
<p data-scroll>Text</p>
```

#### With options
```js
import modularScroll from 'modularscroll';

this.scroll = new modularScroll({
    el: document,
    name: 'scroll',
    class: 'is-inview',
    offset: 0,
    repeat: false
});
```
```html
<h1 data-scroll data-scroll-repeat>Hello</h1>
<p data-scroll data-scroll-offset="60">Text</p>
```

#### With methods
```js
import modularScroll from 'modularscroll';

this.scroll = new modularScroll();

this.scroll.update();
```

#### With events
```js
import modularScroll from 'modularscroll';

this.scroll = new modularScroll();

this.scroll.on('call', (func) => {
    this.call(...func); // Using modularJS
});
```
```html
<div data-scroll data-scroll-call="function, module">Trigger</div>
```

## Options
| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `el` | `object` | `document` | Scroll container element. |
| `name` | `string` | `'scroll'` | Data attributes name. |
| `class` | `string` | `'is-inview'` | Elements in-view class. |
| `offset` | `number` | `0` | In-view trigger offset. |
| `repeat` | `boolean` | `false` | Repeat in-view detection. |

## Attributes
| Attribute | Values | Description |
| --------- | ------ | ----------- |
| `data-scroll` |  | Detect if in-view. |
| `data-scroll-class` | `string` | Element in-view class.  |
| `data-scroll-offset` | `number` | Element in-view trigger offset. |
| `data-scroll-repeat` | `true`, `false` | Element in-view detection repeat. |
| `data-scroll-call` | `string` | Element in-view trigger call event. |

## Methods
| Method | Description |
| --------- | ----------- |
| `init()` | Reinit the scroll. |
| `update()` | Update elements position.  |
| `destroy()` | Destroy the scroll events. |

## Events
| Event | Arguments | Description |
| ----- | --------- | ----------- |
| `call` | `func` | Trigger if in-view. Returns your `string` or `array` if contains `,`. |
