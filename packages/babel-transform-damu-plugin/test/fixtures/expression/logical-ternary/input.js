const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <div>
    {foo ? <efoo /> : <ffoo />}
    <ebar>{bar ? 'isbar' : 'not bar'}</ebar>
  </div>,
  document.querySelector('#app')
);
