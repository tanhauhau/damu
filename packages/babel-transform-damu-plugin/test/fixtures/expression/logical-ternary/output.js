const _div = document.createElement("div");

if (foo) {
  const _efoo = document.createElement("efoo");

  __damu__appendChildren(_div, _efoo);
} else {
  const _ffoo = document.createElement("ffoo");

  __damu__appendChildren(_div, _ffoo);
}

const _ebar = document.createElement("ebar");

if (bar) {
  const _text = document.createTextNode("isbar");

  __damu__appendChildren(_ebar, _text);
} else {
  const _text2 = document.createTextNode("not bar");

  __damu__appendChildren(_ebar, _text2);
}

__damu__appendChildren(_div, _ebar);

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
