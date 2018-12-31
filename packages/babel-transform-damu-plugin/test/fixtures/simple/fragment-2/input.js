const Damu = require('@damu/damu');

const frag = (
  <>
    <div className="child-1" />
    <div className="child-2" />
  </>
);

Damu.render(frag, document.querySelector('#app'));
