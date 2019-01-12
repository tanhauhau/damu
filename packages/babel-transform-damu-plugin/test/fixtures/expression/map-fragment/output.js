const _lists = buyers.map(buyer => {
  const _li = document.createElement("li");

  __damu__appendChildren(_li, buyer.firstName);

  const _text = document.createTextNode(" - ");

  __damu__appendChildren(_li, _text);

  __damu__appendChildren(_li, buyer.lastName);

  return _li;
});

const _lists2 = shop.followers.map(function (follower, index) {
  const _li2 = document.createElement("li");

  __damu__appendChildren(_li2, index);

  const _text2 = document.createTextNode(". ");

  __damu__appendChildren(_li2, _text2);

  __damu__appendChildren(_li2, follower.firstName);

  const _text3 = document.createTextNode(" - ");

  __damu__appendChildren(_li2, _text3);

  __damu__appendChildren(_li2, follower.lastName);

  return _li2;
});

__damu__appendChildren(document.querySelector('#app'), [_lists, _lists2]);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
