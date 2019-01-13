import * as t from '@babel/types';

export function normalizeBlockStatement(path) {
  if (path.node.type !== 'BlockStatement') {
    path.replaceWith(t.blockStatement([t.returnStatement(path.node)]));
  }
  return path;
}
