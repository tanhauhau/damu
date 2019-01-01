const _lists = buyers.map(buyer => {
  const _li2 = document.createElement("li");

  _li2.appendChild(buyer.firstName);

  const _text3 = document.createTextNode(" - ");

  _li2.appendChild(_text3);

  _li2.appendChild(buyer.lastName);

  return _li2;
});

const _lists2 = shop.followers.map(function (follower, index) {
  const _li = document.createElement("li");

  _li.appendChild(index);

  const _text = document.createTextNode(". ");

  _li.appendChild(_text);

  _li.appendChild(follower.firstName);

  const _text2 = document.createTextNode(" - ");

  _li.appendChild(_text2);

  _li.appendChild(follower.lastName);

  return _li;
});

document.querySelector('#app').appendChild(_lists), document.querySelector('#app').appendChild(_lists2);
