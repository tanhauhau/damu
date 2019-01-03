const Damu = require('@damu/damu');

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
);
