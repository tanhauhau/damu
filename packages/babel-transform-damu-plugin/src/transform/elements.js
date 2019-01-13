import * as t from '@babel/types';
import {
  transform as transformElement,
  injectTransformer,
} from './trasnformers';
import { isEmptyJSXText } from '../utils';
import { getIdentifierName } from '../utils/get-identifier-name';
import { setAttribute } from './attributes';
import { documentCreateElement } from '../api/document/create-element';
import { documentCreateTextNode } from '../api/document/create-text-node';
import { appendChild } from '../api/append-child';
import Flags, { turnOnFlag } from '../flags';

injectTransformer('JSXElement', transformJSXElement);
injectTransformer('JSXText', transformJSXText);
injectTransformer('StringLiteral', transformJSXText);

export function transformJSXElement(path, parent) {
  const name = getIdentifierName(path.node.openingElement.name);
  const identifier = path.scope.generateUidIdentifier(name);

  if (/^[A-Z]/.test(name)) {
    turnOnFlag(path, Flags.APPEND_COMPONENT);
    // component
    const statements = [
      t.expressionStatement(
        t.assignmentExpression(
          '=',
          identifier,
          t.newExpression(t.identifier(name), [])
        )
      ),
    ];
    return {
      identifier,
      statements,
    };
  } else {
    // dom
  }

  const result = [];

  const declaration = documentCreateElement(identifier, name);
  result.push(declaration);

  const attributes = path.node.openingElement.attributes.map(attr =>
    setAttribute(identifier, attr.name.name, attr.value, path)
  );
  attributes.forEach(attr => result.push(attr));

  const childrens = path
    .get('children')
    .filter(isEmptyJSXText)
    .map(elem => transformElement(elem, identifier))
    .map(({ statements }) => statements);
  childrens.forEach(children => result.push(...children));

  if (parent) {
    result.push(appendChild(parent, identifier, path));
  }

  return {
    identifier,
    statements: result,
  };
}

export function transformJSXText(path, parent) {
  const identifier = path.scope.generateUidIdentifier('text');
  const statements = [
    documentCreateTextNode(identifier, t.stringLiteral(path.node.value)),
  ];
  if (parent) {
    statements.push(appendChild(parent, identifier, path));
  }
  return {
    identifier,
    statements,
  };
}
