import jsx from '@babel/plugin-syntax-jsx';
import { declare } from '@babel/helper-plugin-utils';
import * as t from '@babel/types';

export default declare((api, options) => {
  api.assertVersion(7);
  return {
    name: 'babel-transform-damu-plugin',
    inherits: jsx,
    visitor: {
      JSXElement: {
        enter(path) {
          const name = getIdentifierName(path.node.openingElement.name);
          const identifier = path.scope.generateUidIdentifier(name);
          path.__damu_identifier__ = identifier;
          //
          const declaration = documentCreateElement(identifier, name);
          const attributes = path.node.openingElement.attributes.map(attr =>
            setAttribute(identifier, attr.name.name, attr.value)
          );
          path.scope.block.body.unshift(declaration, ...attributes);
        },
        exit(path) {
          path.replaceWith(path.__damu_identifier__);
        },
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
