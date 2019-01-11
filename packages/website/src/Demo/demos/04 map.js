import React from 'react';
import ReactDOM from 'react-dom';

const buyers = [
  {
    firstName: 'James',
    lastName: 'Steven',
    followers: [{ firstName: 'James', lastName: 'Steven' }],
  },
  {
    firstName: 'James',
    lastName: 'Steven',
    followers: [
      { firstName: 'James', lastName: 'Steven' },
      { firstName: 'James', lastName: 'Steven' },
    ],
  },
  {
    firstName: 'James',
    lastName: 'Steven',
    followers: [
      { firstName: 'James', lastName: 'Steven' },
      { firstName: 'James', lastName: 'Steven' },
      { firstName: 'James', lastName: 'Steven' },
    ],
  },
  {
    firstName: 'James',
    lastName: 'Steven',
    followers: [
      { firstName: 'James', lastName: 'Steven' },
      { firstName: 'James', lastName: 'Steven' },
      { firstName: 'James', lastName: 'Steven' },
      { firstName: 'James', lastName: 'Steven' },
    ],
  },
];

ReactDOM.render(
  <ul>
    {buyers.map(buyer => (
      <li>
        {buyer.firstName + ' - ' + buyer.lastName}
        {buyer.followers.map((follower, index) => (
          <>
            <li>
              {index + '. ' + follower.firstName + ' - ' + follower.lastName}
            </li>
            <li className="hidden">{index % 2 == 0 ? 'odd' : 'even'}</li>
          </>
        ))}
      </li>
    ))}
  </ul>,
  document.querySelector('#app')
);
