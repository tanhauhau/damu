const _li = document.createElement("li");

buyers.forEach(buyer => {
  const _li3 = document.createElement("li");

  _li3.appendChild(buyer.firstName);

  const _text3 = document.createTextNode(" - ");

  _li3.appendChild(_text3);

  _li3.appendChild(buyer.lastName);

  _li.appendChild(_li3);
});
shop.followers.forEach((follower, index) => {
  const _li2 = document.createElement("li");

  _li2.appendChild(index);

  const _text = document.createTextNode(". ");

  _li2.appendChild(_text);

  _li2.appendChild(follower.firstName);

  const _text2 = document.createTextNode(" - ");

  _li2.appendChild(_text2);

  _li2.appendChild(follower.lastName);

  _li.appendChild(_li2);
});
document.querySelector('#app').appendChild(_li);
