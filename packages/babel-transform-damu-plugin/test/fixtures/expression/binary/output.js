const _div = document.createElement("div");

const _result = document.createTextNode('123' + '444');

_div.appendChild(_result);

const _result2 = document.createTextNode(follower.count + ' followers');

_div.appendChild(_result2);

document.querySelector('#app').appendChild(_div);
