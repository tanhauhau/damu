const _div = document.createElement("div");

if (foo) {
  const _efoo = document.createElement("efoo");

  _div.appendChild(_efoo);
} else {
  const _ffoo = document.createElement("ffoo");

  _div.appendChild(_ffoo);
}

const _ebar = document.createElement("ebar");

if (bar) {
  const _text = document.createTextNode("isbar");

  _ebar.appendChild(_text);
} else {
  const _text2 = document.createTextNode("not bar");

  _ebar.appendChild(_text2);
}

_div.appendChild(_ebar);

document.querySelector('#app').appendChild(_div);
