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

export function isMapCallExpression(path) {
  return (
    path.has('callee') &&
    path.get('callee').isMemberExpression() &&
    path.get('callee.property').isIdentifier({ name: 'map' }) &&
    path.has('arguments') &&
    path.get('arguments').length === 1 &&
    (path.get('arguments.0').isArrowFunctionExpression() ||
      path.get('arguments.0').isFunctionExpression())
  );
}
