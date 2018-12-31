const _div = document.createElement("div");

_div.setAttribute("className", "body");

const _h = document.createElement("h1");

_h.setAttribute("className", "header");

const _text = document.createTextNode("You shall not pass");

_h.appendChild(_text);

_div.appendChild(_h);

const _li = document.createElement("li");

const _ul = document.createElement("ul");

_ul.setAttribute("id", "item-1");

const _text2 = document.createTextNode("Item 1");

_ul.appendChild(_text2);

_li.appendChild(_ul);

const _ul2 = document.createElement("ul");

_ul2.setAttribute("id", "item-2");

const _text3 = document.createTextNode("Item 2");

_ul2.appendChild(_text3);

_li.appendChild(_ul2);

const _ul3 = document.createElement("ul");

_ul3.setAttribute("id", "item-3");

const _text4 = document.createTextNode("Item 3");

_ul3.appendChild(_text4);

_li.appendChild(_ul3);

const _ul4 = document.createElement("ul");

_ul4.setAttribute("id", "item-4");

const _text5 = document.createTextNode("Item 4");

_ul4.appendChild(_text5);

_li.appendChild(_ul4);

const _ul5 = document.createElement("ul");

_ul5.setAttribute("id", "item-5");

const _text6 = document.createTextNode("Item 5");

_ul5.appendChild(_text6);

_li.appendChild(_ul5);

const _ul6 = document.createElement("ul");

_ul6.setAttribute("id", "item-6");

const _text7 = document.createTextNode("Item 6");

_ul6.appendChild(_text7);

_li.appendChild(_ul6);

const _ul7 = document.createElement("ul");

_ul7.setAttribute("id", "item-7");

const _text8 = document.createTextNode("Item 7");

_ul7.appendChild(_text8);

_li.appendChild(_ul7);

_div.appendChild(_li);

document.querySelector('#app').appendChild(_div);
