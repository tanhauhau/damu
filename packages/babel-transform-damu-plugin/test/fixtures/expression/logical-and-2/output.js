const _div = document.createElement("div");

if (foo && foo1 && foo2) {
  const _efoo = document.createElement("efoo");

  const _text = document.createTextNode("foo text");

  __damu__appendChildren(_efoo, _text);

  __damu__appendChildren(_div, _efoo);
}

if (bar && bar.foo && bar.foo.baz) {
  const _ebar = document.createElement("ebar");

  const _text2 = document.createTextNode("text");

  __damu__appendChildren(_ebar, _text2);

  __damu__appendChildren(_div, _ebar);
}

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
