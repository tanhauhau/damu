import * as t from '@babel/types';

export function declareConst(identifier, value) {
  return t.variableDeclaration('const', [
    t.variableDeclarator(identifier, value),
  ]);
}

export function isEmptyJSXText(path) {
  return !(path.node.type === 'JSXText' && path.node.value.trim() === '');
}
export function isEmptyJSXTextNode(node) {
  return !(node.type === 'JSXText' && node.value.trim() === '');
}

export function toArray(list) {
  return t.arrayExpression(list);
}

export function ifBlock(condition, thenCase, elseCase) {
  const thenCaseArray = thenCase
    ? Array.isArray(thenCase)
      ? thenCase
      : [thenCase]
    : [];
  const elseCaseArray = elseCase
    ? Array.isArray(elseCase)
      ? elseCase
      : [elseCase]
    : [];
  return t.ifStatement(
    condition,
    t.blockStatement(thenCaseArray),
    elseCase ? t.blockStatement(elseCaseArray) : null
  );
}

export function isMapCallExpression(node) {
  return (
    node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.property &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'map' &&
    node.arguments &&
    node.arguments.length === 1 &&
    ['FunctionExpression', 'ArrowFunctionExpression'].includes(
      node.arguments[0].type
    )
  );
}
