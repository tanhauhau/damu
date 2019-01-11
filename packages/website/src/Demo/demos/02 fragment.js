import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <h2>The Damu-Madu Project</h2>
    <p>
      The Damu-Madu sister project aims to bring the developer experience of
      writing JSX (XML in JavaScript) without having to use React.
    </p>
    <p>
      JSX is independent of React, you don't have to use React just to use JSX
      in your development process.
    </p>
    <p>
      The Damu-Madu sister project contains solution for both client render and
      server render:
    </p>
    <ul>
      <li>
        <a href="https://github.com/tanhauhau/madu">madu</a> - Writing jsx as if
        html string
      </li>
      <li>
        <a href="https://github.com/tanhauhau/damu">damu</a> - Converts jsx to
        vanilla javascript
      </li>
    </ul>
  </>,
  document.querySelector('#app')
);
