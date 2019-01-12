const _div = document.createElement("div");

_div.style.border = '1px solid black';
_div.style.color = 'red';
_div.style.paddingTop = "30px";
_div.style.fontFamily = 'Verdana';

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
