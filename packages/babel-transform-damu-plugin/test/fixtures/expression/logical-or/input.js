const Damu = require('@damu/damu');

Damu.render(
  <div>
    {foo || <efoo />}
    {bar.foo || <ebar>text</ebar>}
  </div>,
  document.querySelector('#app')
);
