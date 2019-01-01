const Damu = require('@damu/damu');

Damu.render(
  <div>
    {'123' + '444'}
    {follower.count + ' followers'}
  </div>,
  document.querySelector('#app')
);
