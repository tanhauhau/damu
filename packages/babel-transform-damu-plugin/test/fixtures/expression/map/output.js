const _li = document.createElement("li");

buyers.forEach(buyer => {
  const _li2 = document.createElement("li");

  __damu__appendChildren(_li2, buyer.firstName);

  const _text = document.createTextNode(" - ");

  __damu__appendChildren(_li2, _text);

  __damu__appendChildren(_li2, buyer.lastName);

  __damu__appendChildren(_li, _li2);
});
shop.followers.forEach((follower, index) => {
  const _li3 = document.createElement("li");

  __damu__appendChildren(_li3, index);

  const _text2 = document.createTextNode(". ");

  __damu__appendChildren(_li3, _text2);

  __damu__appendChildren(_li3, follower.firstName);

  const _text3 = document.createTextNode(" - ");

  __damu__appendChildren(_li3, _text3);

  __damu__appendChildren(_li3, follower.lastName);

  __damu__appendChildren(_li, [_li3]);
});

__damu__appendChildren(document.querySelector('#app'), _li);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
