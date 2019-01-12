import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div
    style={{
      cursor: 'pointer',
      padding: 10,
      border: '1px solid black',
      display: 'inline-block',
    }}
    onClick={() => {
      alert('Hello Damu!');
    }}
  >
    Click Me
  </div>,
  document.querySelector('#app')
);
