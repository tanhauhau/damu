const _div = document.createElement("div");

if (foo && foo1 && foo2) {
  const _efoo = document.createElement("efoo");

  const _text = document.createTextNode("foo text");

  _efoo.appendChild(_text);

  _div.appendChild(_efoo);
}

if (bar && bar.foo && bar.foo.baz) {
  const _ebar = document.createElement("ebar");

  const _text2 = document.createTextNode("text");

  _ebar.appendChild(_text2);

  _div.appendChild(_ebar);
}

document.querySelector('#app').appendChild(_div);
