const Damu = require('@damu/damu');

Damu.render(
  <div>
    {foo ? <efoo /> : <ffoo />}
    <ebar>{bar ? 'isbar' : 'not bar'}</ebar>
  </div>,
  document.querySelector('#app')
);
