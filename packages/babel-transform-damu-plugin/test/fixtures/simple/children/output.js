const _div = document.createElement("div");

_div.setAttribute("className", "parent");

const _div2 = document.createElement("div");

_div2.setAttribute("className", "child-1");

__damu__appendChildren(_div, _div2);

const _div3 = document.createElement("div");

_div3.setAttribute("className", "child-2");

__damu__appendChildren(_div, _div3);

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
