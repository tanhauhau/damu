const _div = document.createElement("div");

_div.setAttribute("style", "border: 1px solid black; color: red;padding-top: 30px;font-family: 'Verdana';");

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
