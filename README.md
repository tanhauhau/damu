# WIP: damu

> Note: this is not production ready.

> Insprired by [svelte](https://svelte.technology/), but written by myself.

Converts jsx to vanilla javascript



Converts:

```jsx
const Damu = require('@damu/damu');

Damu.render(
  <div className="foo" foo="bar">
    <a href="http://github.com/tanhauhau/damu">Damu</a>
  </div>,
  document.querySelector('#app')
);
```

into:

```js
const Damu = require('@damu/damu');

const div = document.createElement('div');
div.setAttribute('class', 'foo');
div.setAttribute('foo', 'bar');

const a = document.createElement('a');
a.setAttribute('href', 'http://github.com/tanhauhau/damu');
a.textContent = 'Damu';
div.appendChild(a);

const app = document.querySelector('#app');
app.appendChild(div);
```


## The Damu-Madu Project

The Damu-Madu sister project aims to bring the developer experience of writing JSX (XML in JavaScript) without having to use React.

JSX is independent of React, you don't have to use React just to use JSX in your development process.

The Damu-Madu sister project contains solution for both client render and server render:

- [madu](https://github.com/tanhauhau/madu) - Writing jsx as if html string
- [damu](https://github.com/tanhauhau/damu) - Converts jsx to vanilla javascript