const _div = document.createElement("div");

_div.setAttribute("className", "parent");

const _div2 = document.createElement("div");

_div2.setAttribute("className", "child-1");

_div.appendChild(_div2);

const _div3 = document.createElement("div");

_div3.setAttribute("className", "child-2");

_div.appendChild(_div3);

document.querySelector('#app').appendChild(_div);
