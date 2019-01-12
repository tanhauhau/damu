const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <div>
    {foo || <efoo />}
    {bar.foo || <ebar>text</ebar>}
  </div>,
  document.querySelector('#app')
);
