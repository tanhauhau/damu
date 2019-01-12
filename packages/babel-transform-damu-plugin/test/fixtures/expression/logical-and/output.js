const _div = document.createElement("div");

if (foo) {
  const _efoo = document.createElement("efoo");

  __damu__appendChildren(_div, _efoo);
}

if (bar.foo) {
  const _ebar = document.createElement("ebar");

  const _text = document.createTextNode("text");

  __damu__appendChildren(_ebar, _text);

  __damu__appendChildren(_div, _ebar);
}

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
