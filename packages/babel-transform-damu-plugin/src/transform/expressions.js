import * as t from '@babel/types';
import {
  transform as transformElement,
  injectTransformer,
} from './trasnformers';
import { declareConst, isMapCallExpression, ifBlock } from '../utils';
import { documentCreateTextNode } from '../api/document/create-text-node';
import { appendChild } from '../api/append-child';
import { normalizeBlockStatement } from '../utils/normalize-block-statement';

injectTransformer('JSXExpressionContainer', transformJSXExpression);
injectTransformer('BinaryExpression', transformBinaryExpression);
injectTransformer('CallExpression', transformCallExpression);
injectTransformer('LogicalExpression', transformLogicalExpression);
injectTransformer('ConditionalExpression', transformConditionalExpression);

export function transformJSXExpression(path, parent) {
  return transformElement(path.get('expression'), parent);
}

function transformBinaryExpression(path, parent) {
  const identifier = path.scope.generateUidIdentifier('result');
  const statements = [documentCreateTextNode(identifier, path.node)];
  if (parent) {
    statements.push(appendChild(parent, identifier, path));
  }
  return {
    identifier,
    statements,
  };
}

export function transformCallExpression(path, parent) {
  if (isMapCallExpression(path.node)) {
    return transformMapCallExpresion(path, parent);
  }

  // normal call expression
  const identifier = path.scope.generateUidIdentifier('result');
  const statements = [declareConst(identifier, path.node)];
  if (parent) {
    statements.push(appendChild(parent, identifier, path));
  }
  return {
    identifier,
    statements,
  };
}

export function transformMapCallExpresion(path, parent) {
  normalizeBlockStatement(path.get('arguments.0.body'));
  if (parent) {
    // arr.forEach(i => parent.appendChild(i))
    path.get('callee.property').replaceWith(t.identifier('forEach'));
    const mapperBody = path.get('arguments.0.body.body');
    const returnStatement = mapperBody.find(
      b => b.node.type === 'ReturnStatement'
    );
    if (returnStatement) {
      returnStatement.replaceWith(
        appendChild(parent, returnStatement.node.argument, path)
      );
    }
    const statements = [t.expressionStatement(path.node)];
    return { identifier: null, statements };
  } else {
    // identifier = arr.map(i => i)
    const identifier = path.scope.generateUidIdentifier('lists');
    // console.log(path.node);
    const statements = [declareConst(identifier, path.node)];
    return { identifier, statements };
  }
}

export function transformLogicalExpression(path, parent) {
  switch (path.node.operator) {
    case '&&':
      return transformLogicalAndExpression(path, parent);
    case '||':
      return transformLogicalOrExpression(path, parent);
  }
  throw new Error('Unknown logical operator: ' + path.node.operator);
}

export function transformLogicalAndExpression(path, parent) {
  const identifier = path.scope.generateUidIdentifier('result');
  const consequent = transformElement(path.get('right'), parent);
  const statements = [ifBlock(path.node.left, consequent.statements)];

  return {
    identifier,
    statements,
  };
}

export function transformLogicalOrExpression(path, parent) {
  const identifier = path.scope.generateUidIdentifier('result');
  const consequent = transformElement(path.get('left'), parent);
  const alternate = transformElement(path.get('right'), parent);

  const statements = [
    ifBlock(path.node.left, consequent.statements, alternate.statements),
  ];

  return {
    identifier,
    statements,
  };
}

export function transformConditionalExpression(path, parent) {
  const identifier = path.scope.generateUidIdentifier('result');
  const consequent = transformElement(path.get('consequent'), parent);
  const alternate = transformElement(path.get('alternate'), parent);

  const statements = [
    ifBlock(path.node.test, consequent.statements, alternate.statements),
  ];
  return {
    identifier,
    statements,
  };
}
