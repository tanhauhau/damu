const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <>
    {buyers.map(buyer => (
      <li>
        {buyer.firstName} - {buyer.lastName}
      </li>
    ))}
    {shop.followers.map(function(follower, index) {
      return (
        <li>
          {index}. {follower.firstName} - {follower.lastName}
        </li>
      );
    })}
  </>,
  document.querySelector('#app')
);
