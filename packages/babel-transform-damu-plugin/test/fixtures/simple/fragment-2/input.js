const React = require('react');
const ReactDOM = require('react-dom');

const frag = (
  <>
    <div className="child-1" />
    <div className="child-2" />
  </>
);

ReactDOM.render(frag, document.querySelector('#app'));
