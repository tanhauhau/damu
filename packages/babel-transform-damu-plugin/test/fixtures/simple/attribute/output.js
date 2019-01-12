const _div = document.createElement("div");

_div.setAttribute("id", "foo");

_div.setAttribute("foo", "bar");

_div.setAttribute("height", 54);

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
