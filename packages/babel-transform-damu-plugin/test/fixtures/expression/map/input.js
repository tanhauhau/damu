const Damu = require('@damu/damu');

Damu.render(
  <li>
    {buyers.map(buyer => (
      <li>
        {buyer.firstName} - {buyer.lastName}
      </li>
    ))}
    {shop.followers.map((follower, index) => (
      <>
        <li>
          {index}. {follower.firstName} - {follower.lastName}
        </li>
      </>
    ))}
  </li>,
  document.querySelector('#app')
);
