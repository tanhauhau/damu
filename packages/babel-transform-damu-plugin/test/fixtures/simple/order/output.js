const height = 54;

const _div = document.createElement("div");

_div.setAttribute("id", "foo");

_div.setAttribute("foo", 'bar');

_div.setAttribute("height", height);

document.querySelector('#app').appendChild(_div);
