<p align="center">
    <a href="https://github.com/modularbp/modular-boilerplate">
        <img src="https://user-images.githubusercontent.com/4596862/37635200-aa3271b2-2bd0-11e8-8a65-9cafa0addd67.png" height="140">
    </a>
</p>
<h1 align="center">modularScroll</h1>
<p align="center">A dead simple elements in viewport detection.</p>

## Installation
```sh
npm install modularscroll -s
```

## Why
- Simple
- Lightweight
- High performance
- No dependencies

## Usage
```js
import modularScroll from 'modularscroll';

const scroll = new modularScroll();
```
```html
<h1 data-scroll>Hello</h1>
<p data-scroll>Text</p>
```

#### With options
```js
import modularScroll from 'modularscroll';

const scroll = new modularScroll({
    el: document,
    name: 'scroll',
    class: 'is-inview',
    repeat: false
});
```
```html
<h1 data-scroll>Hello</h1>
<p data-scroll data-scroll-repeat>Text</p>
```

## Options
| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `el` | `object` | `document` | Scroll container element |
| `name` | `string` | `'scroll'` | Data attributes name |
| `class` | `string` | `'is-inview'` | Elements in-view class |
| `repeat` | `boolean` | `false` | Repeat in-view detection |

## Attributes
| Attribute | Values | Description |
| --------- | ------ | ----------- |
| `data-scroll` |  | Detect if in-view |
| `data-scroll-repeat` | `true`, `false` | Repeat in-view detection |
