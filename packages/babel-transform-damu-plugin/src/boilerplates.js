import { parseSync } from '@babel/core';

export const APPEND_CHILDREN = parse(function __damu__appendChildren(
  parent,
  children
) {
  children = Array.isArray(children) ? children : [children];
  children.forEach(function(child) {
    parent.appendChild(child);
  });
});

export const APPEND_CHILD_WITH_COMPONENT = parse(
  function __damu__appendChildren(parent, children) {
    children = Array.isArray(children) ? children : [children];
    children.forEach(function(child) {
      if (typeof child.render === 'function') {
        child = child.render();
      }
      parent.appendChild(child);
    });
  }
);

function parse(...fns) {
  return parseSync(fns.join('').toString()).program.body[0];
}
