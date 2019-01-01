const _div = document.createElement("div");

if (foo) {
  const _efoo = document.createElement("efoo");

  _div.appendChild(_efoo);
}

if (bar.foo) {
  const _ebar = document.createElement("ebar");

  const _text = document.createTextNode("text");

  _ebar.appendChild(_text);

  _div.appendChild(_ebar);
}

document.querySelector('#app').appendChild(_div);
