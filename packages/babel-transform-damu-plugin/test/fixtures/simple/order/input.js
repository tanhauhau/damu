const Damu = require('@damu/damu');

const height = 54;

Damu.render(
  <div id="foo" foo={'bar'} height={height} />,
  document.querySelector('#app')
);
