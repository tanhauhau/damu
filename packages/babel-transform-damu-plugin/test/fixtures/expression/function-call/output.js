const _div = document.createElement("div");

const _result = renderContent(content);

_div.appendChild(_result);

document.querySelector('#app').appendChild(_div);
