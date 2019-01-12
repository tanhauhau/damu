const _div = document.createElement("div");

_div.className = "child-1";

const _div2 = document.createElement("div");

_div2.className = "child-2";

__damu__appendChildren(document.querySelector('#app'), [_div, _div2]);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
