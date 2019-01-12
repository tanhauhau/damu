const _div = document.createElement("div");

_div.setAttribute("className", "body");

const _h = document.createElement("h1");

_h.setAttribute("className", "header");

const _text = document.createTextNode("You shall not pass");

__damu__appendChildren(_h, _text);

__damu__appendChildren(_div, _h);

const _li = document.createElement("li");

const _ul = document.createElement("ul");

_ul.setAttribute("id", "item-1");

const _text2 = document.createTextNode("Item 1");

__damu__appendChildren(_ul, _text2);

__damu__appendChildren(_li, _ul);

const _ul2 = document.createElement("ul");

_ul2.setAttribute("id", "item-2");

const _text3 = document.createTextNode("Item 2");

__damu__appendChildren(_ul2, _text3);

__damu__appendChildren(_li, _ul2);

const _ul3 = document.createElement("ul");

_ul3.setAttribute("id", "item-3");

const _text4 = document.createTextNode("Item 3");

__damu__appendChildren(_ul3, _text4);

__damu__appendChildren(_li, _ul3);

const _ul4 = document.createElement("ul");

_ul4.setAttribute("id", "item-4");

const _text5 = document.createTextNode("Item 4");

__damu__appendChildren(_ul4, _text5);

__damu__appendChildren(_li, _ul4);

const _ul5 = document.createElement("ul");

_ul5.setAttribute("id", "item-5");

const _text6 = document.createTextNode("Item 5");

__damu__appendChildren(_ul5, _text6);

__damu__appendChildren(_li, _ul5);

const _ul6 = document.createElement("ul");

_ul6.setAttribute("id", "item-6");

const _text7 = document.createTextNode("Item 6");

__damu__appendChildren(_ul6, _text7);

__damu__appendChildren(_li, _ul6);

const _ul7 = document.createElement("ul");

_ul7.setAttribute("id", "item-7");

const _text8 = document.createTextNode("Item 7");

__damu__appendChildren(_ul7, _text8);

__damu__appendChildren(_li, _ul7);

__damu__appendChildren(_div, _li);

__damu__appendChildren(document.querySelector('#app'), _div);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
