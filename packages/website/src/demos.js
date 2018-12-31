export default {
  simple: `const Damu = require('@damu/damu');

  Damu.render(
    <div id="foo" foo={'bar'} height={54} />,
    document.querySelector('#app')
  );`,
  fragment: `const Damu = require('@damu/damu');

  Damu.render(
    <>
      <div className="child-1" />
      <div className="child-2" />
    </>,
    document.querySelector('#app')
  );`,

  list: `const Damu = require('@damu/damu');

  Damu.render(
    <div className="body">
      <h1 className="header">You shall not pass</h1>
      <li>
        <ul id="item-1">Item 1</ul>
        <ul id="item-2">Item 2</ul>
        <ul id="item-3">Item 3</ul>
        <ul id="item-4">Item 4</ul>
        <ul id="item-5">Item 5</ul>
        <ul id="item-6">Item 6</ul>
        <ul id="item-7">Item 7</ul>
      </li>
    </div>,
    document.querySelector('#app')
  );
  `,
};
