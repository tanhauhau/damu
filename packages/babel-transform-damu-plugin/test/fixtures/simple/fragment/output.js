const _div = document.createElement("div");

_div.setAttribute("className", "child-1");

const _div2 = document.createElement("div");

_div2.setAttribute("className", "child-2");

document.querySelector('#app').appendChild([_div, _div2]);
