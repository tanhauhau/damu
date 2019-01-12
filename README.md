# WIP: [DAMU](https://lihautan.com/damu/)

> Note: this is not production ready.

> Damu compiles React application into plain Vanilla JavaScript application.

[Try out Damu here](https://lihautan.com/damu/#/repl)

Converts:

```jsx
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <div>
    <a
      href="https://github.com/tanhauhau/damu"
      rel="noopener noreferrer"
      target="_blank"
    >
      Damu
    </a>
  </div>,
  document.querySelector('#app')
);
```

into:

```js
const _div = document.createElement("div");

const _a = document.createElement("a");
_a.setAttribute("href", "https://github.com/tanhauhau/damu");
_a.setAttribute("rel", "noopener noreferrer");
_a.setAttribute("target", "_blank");

const _text = document.createTextNode("Damu");
__damu__appendChildren(_a, _text);
__damu__appendChildren(_div, _a);
__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
```

## The Damu-Madu Project

The Damu-Madu sister project aims to bring the developer experience of writing JSX (XML in JavaScript) without having to use React.

JSX is independent of React, you don't have to use React just to use JSX in your development process.

The Damu-Madu sister project contains solution for both client render and server render:

- [madu](https://github.com/tanhauhau/madu) - Writing jsx as if html string
- [damu](https://github.com/tanhauhau/damu) - Converts jsx to vanilla javascript
