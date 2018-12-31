const Damu = require('@damu/damu');

Damu.render(
  <div className="parent">
    <div className="child-1" />
    <div className="child-2" />
  </div>,
  document.querySelector('#app')
);
