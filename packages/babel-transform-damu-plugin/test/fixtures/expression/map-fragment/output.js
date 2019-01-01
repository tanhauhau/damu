const _lists = buyers.map(buyer => {
  const _li = document.createElement("li");

  _li.appendChild(buyer.firstName);

  const _text = document.createTextNode(" - ");

  _li.appendChild(_text);

  _li.appendChild(buyer.lastName);

  return _li;
});

const _lists2 = shop.followers.map(function (follower, index) {
  const _li2 = document.createElement("li");

  _li2.appendChild(index);

  const _text2 = document.createTextNode(". ");

  _li2.appendChild(_text2);

  _li2.appendChild(follower.firstName);

  const _text3 = document.createTextNode(" - ");

  _li2.appendChild(_text3);

  _li2.appendChild(follower.lastName);

  return _li2;
});

document.querySelector('#app').appendChild(_lists), document.querySelector('#app').appendChild(_lists2);
