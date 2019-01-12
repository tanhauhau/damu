const _div = document.createElement("div");

const _result = document.createTextNode('123' + '444');

__damu__appendChildren(_div, _result);

const _result2 = document.createTextNode(follower.count + ' followers');

__damu__appendChildren(_div, _result2);

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
