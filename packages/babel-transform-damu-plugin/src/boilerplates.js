import { parseSync } from '@babel/core';

export const APPEND_CHILDREN = parse(`
function __damu__appendChildren(parent, children) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function(child) {
    parent.appendChild(child);
  });
}
`);


function parse(code) {
  return parseSync(code).program.body[0];
}