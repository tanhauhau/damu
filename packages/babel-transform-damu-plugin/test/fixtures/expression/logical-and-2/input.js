const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <div>
    {foo && foo1 && foo2 && <efoo>foo text</efoo>}
    {bar && bar.foo && bar.foo.baz && <ebar>text</ebar>}
  </div>,
  document.querySelector('#app')
);
