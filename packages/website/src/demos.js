export default {
  simple: `const Damu = require('@damu/damu');

Damu.render(
  <h1 id="title" height={54}>Hello world</h1>,
  document.querySelector('#app')
);`,
  fragment: `const Damu = require('@damu/damu');

Damu.render(
  <>
    <h2>The Damu-Madu Project</h2>
    <p>The Damu-Madu sister project aims to bring the developer experience of writing JSX (XML in JavaScript) without having to use React.</p>
    <p>JSX is independent of React, you don't have to use React just to use JSX in your development process.</p>
    <p>The Damu-Madu sister project contains solution for both client render and server render:</p>
    <ul>
      <li><a href="https://github.com/tanhauhau/madu">madu</a> - Writing jsx as if html string</li>
      <li><a href="https://github.com/tanhauhau/damu">damu</a> - Converts jsx to vanilla javascript</li>
    </ul>
  </>,
  document.querySelector('#app')
);`,

  list: `const Damu = require('@damu/damu');

Damu.render(
  <div className="body">
    <h1 className="header">You shall not pass</h1>
    <ul>
      <li id="frodo">Frodo Baggins</li>
      <li id="samwise">Samwise Gamgee</li>
      <li id="gandalf">Gandalf the Grey</li>
      <li id="legolas">Legolas</li>
      <li id="gimli">Gimli</li>
      <li id="aragorn">Aragorn</li>
      <li id="boromir">Boromir</li>
      <li id="meriadoc">Meriadoc</li>
      <li id="peregrin">Peregrin</li>
    </ul>
  </div>,
  document.querySelector('#app')
);`,

  map: `const Damu = require('@damu/damu');

Damu.render(
  <li>
    {buyers.map(buyer => (
      <li>
        {buyer.firstName} - {buyer.lastName}
        {buyer.followers.map((follower, index) => (
          <>
            <li>
              {index}. {follower.firstName} - {follower.lastName}
            </li>
            <li className="hidden">
              {index % 2 == 0 ? 'odd' : 'even'}
            </li>
          </>
        ))}
      </li>
    ))}
  </li>,
  document.querySelector('#app')
);`
};
