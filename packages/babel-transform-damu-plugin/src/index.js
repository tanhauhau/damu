import jsx from '@babel/plugin-syntax-jsx';
import { declare } from '@babel/helper-plugin-utils';
import * as t from '@babel/types';

export default declare((api, options) => {
  api.assertVersion(7);
  return {
    name: 'babel-transform-damu-plugin',
    inherits: jsx,
    visitor: {
      JSXElement(path) {
        const { identifier, statements } = transformJSXElement(path);
        path.replaceWith(identifier);
        statements.reverse().forEach(statement => {
          path.scope.path.unshiftContainer('body', statement);
        });
      },
      JSXFragment(path) {
        const { identifiers, statements } = path
          .get('children')
          .filter(isEmptyJSXText)
          .map(transformElement)
          .reduce(
            (result, { identifier, statements }) => {
              result.identifiers.push(identifier);
              result.statements.push(...statements);
              return result;
            },
            { identifiers: [], statements: [] }
          );

        path.replaceWith(toArray(identifiers));
        statements.reverse().forEach(statement => {
          path.scope.path.unshiftContainer('body', statement);
        });
      },
      CallExpression: {
        exit(path) {
          if (isDamuRender(path.node)) {
            const args = path.node.arguments;
            const elem = args[0];
            const target = args[1];
            path.replaceWith(appendChild(target, elem));
          }
        },
      },
      Program: {
        exit(path) {
          path.scope.bindings.Damu.path.remove();
          // // console.log(path.scope.bindings.Damu.referencePaths.length);
          // console.log('');
          // console.log('');
          // console.log('');
          // console.log('');
          // console.log('');
          // console.log('');
        },
      },
    },
  };
});

function transformElement(path) {
  switch (path.node.type) {
    case 'JSXElement':
      return transformJSXElement(path);
    case 'JSXText':
      return transformJSXText(path);
    default:
      throw new Error('Unknown element type:', path.node.type);
  }
}

function transformJSXElement(path) {
  const name = getIdentifierName(path.node.openingElement.name);
  const identifier = path.scope.generateUidIdentifier(name);

  const result = [];

  const declaration = documentCreateElement(identifier, name);
  result.push(declaration);

  const attributes = path.node.openingElement.attributes.map(attr =>
    setAttribute(identifier, attr.name.name, attr.value)
  );
  attributes.forEach(attr => result.push(attr));

  const childrens = path
    .get('children')
    .filter(isEmptyJSXText)
    .map(transformElement)
    .map(({ identifier: child, statements }) => [
      ...statements,
      appendChild(identifier, child),
    ]);
  childrens.forEach(children => result.push(...children));
  return {
    identifier,
    statements: result,
  };
}

function transformJSXText(path) {
  const identifier = path.scope.generateUidIdentifier('text');
  return {
    identifier,
    statements: [documentCreateTextNode(identifier, path.node.value)],
  };
}

function getIdentifierName(node) {
  switch (node.type) {
    case 'JSXMemberExpression':
      return (
        getIdentifierName(node.object) + '.' + getIdentifierName(node.property)
      );
    case 'JSXIdentifier':
      return node.name;
    default:
      throw new Error('Unknown type: ', node.type);
  }
}

function documentCreateElement(identifier, elemName) {
  // handle functional component?
  return declareConst(
    identifier,
    t.callExpression(
      t.memberExpression(
        t.identifier('document'),
        t.identifier('createElement')
      ),
      [t.stringLiteral(elemName)]
    )
  );
}

function documentCreateTextNode(identifier, text) {
  return declareConst(
    identifier,
    t.callExpression(
      t.memberExpression(
        t.identifier('document'),
        t.identifier('createTextNode')
      ),
      [t.stringLiteral(text)]
    )
  );
}

function declareConst(identifier, value) {
  return t.variableDeclaration('const', [
    t.variableDeclarator(identifier, value),
  ]);
}

function appendChild(parent, child) {
  return t.expressionStatement(
    t.callExpression(t.memberExpression(parent, t.identifier('appendChild')), [
      child,
    ])
  );
}

function setAttribute(identifier, key, value) {
  let _value =
    value.type === 'JSXExpressionContainer' ? value.expression : value;
  return t.expressionStatement(
    t.callExpression(
      t.memberExpression(identifier, t.identifier('setAttribute')),
      [t.stringLiteral(key), _value]
    )
  );
}

function isEmptyJSXText(path) {
  return !(path.node.type === 'JSXText' && path.node.value.trim() === '');
}

function toArray(list) {
  return t.arrayExpression(list);
}

function isDamuRender(node) {
  return (
    node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'Damu' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'render'
  );
}
