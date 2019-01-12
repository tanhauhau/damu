const React = require('react');
const ReactDOM = require('react-dom');

const height = 54;

ReactDOM.render(
  <div id="foo" foo={'bar'} height={height} />,
  document.querySelector('#app')
);
