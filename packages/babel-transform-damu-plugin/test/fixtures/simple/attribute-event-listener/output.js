const _div = document.createElement("div");

_div.addEventListener("click", onClick);

_div.addEventListener("click", onClickCapture, true);

_div.addEventListener("contextmenu", onContextMenu);

_div.setAttribute("onDoubleClick", onDoubleClick);

_div.addEventListener("drag", onDrag);

_div.addEventListener("dragend", onDragEnd);

_div.addEventListener("dragenter", onDragEnter);

_div.addEventListener("dragexit", onDragExit);

_div.addEventListener("dragleave", onDragLeave);

_div.addEventListener("dragover", onDragOver);

_div.addEventListener("dragstart", onDragStart);

_div.addEventListener("drop", onDrop);

_div.addEventListener("mousedown", onMouseDown);

_div.setAttribute("onMouseEnter", onMouseEnter);

_div.setAttribute("onMouseLeave", onMouseLeave);

_div.addEventListener("mousemove", onMouseMove);

_div.addEventListener("mouseout", onMouseOut);

_div.addEventListener("mouseover", onMouseOver);

_div.addEventListener("mouseup", onMouseUp);

_div.addEventListener("pointerdown", onPointerDown);

_div.addEventListener("pointermove", onPointerMove);

_div.addEventListener("pointerup", onPointerUp);

_div.addEventListener("pointercancel", onPointerCancel);

_div.addEventListener("gotpointercapture", onGotPointerCapture);

_div.addEventListener("lostpointercapture", onLostPointerCapture);

_div.addEventListener("pointerenter", onPointerEnter);

_div.addEventListener("pointerleave", onPointerLeave);

_div.addEventListener("pointerover", onPointerOver);

_div.addEventListener("pointerout", onPointerOut);

_div.addEventListener("touchcancel", onTouchCancel);

_div.addEventListener("touchend", onTouchEnd);

_div.addEventListener("touchmove", onTouchMove);

_div.addEventListener("touchstart", onTouchStart);

_div.addEventListener("scroll", onScroll);

_div.setAttribute("onSelect", onSelect);

_div.addEventListener("wheel", onWheel);

const _img = document.createElement("img");

_img.addEventListener("load", onLoad);

_img.addEventListener("error", onError);

const _input = document.createElement("input");

_input.addEventListener("change", onChange);

__damu__appendChildren(document.querySelector('#app'), [_div, _img, _input]);

function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
