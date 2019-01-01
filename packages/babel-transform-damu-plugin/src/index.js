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
        statements.forEach(statement => {
          unshiftIntoBlock(path, statement);
        });
      },
      JSXFragment(path) {
        const { identifiers, statements } = path
          .get('children')
          .filter(isEmptyJSXText)
          .map(elem => transformElement(elem))
          .reduce(
            (result, { identifier, statements }) => {
              result.identifiers.push(identifier);
              result.statements.push(...statements);
              return result;
            },
            { identifiers: [], statements: [] }
          );

        path.replaceWith(toArray(identifiers));
        statements.forEach(statement => {
          unshiftIntoBlock(path, statement);
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
          const DamuBindings = path.scope.bindings.Damu;
          if (DamuBindings) {
            DamuBindings.path.remove();
          }
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

function transformElement(path, parent) {
  switch (path.node.type) {
    case 'JSXElement':
      return transformJSXElement(path, parent);
    case 'JSXText':
    case 'StringLiteral':
      return transformJSXText(path, parent);
    case 'JSXExpressionContainer':
      return transformJSXExpression(path, parent);
    case 'Identifier':
    case 'MemberExpression':
      return transformIdentifier(path, parent);

    default:
      throw new Error('Unknown element type: ' + path.node.type);
  }
}

function transformJSXElement(path, parent) {
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
    .map(elem => transformElement(elem, identifier))
    .map(({ statements }) => statements);
  childrens.forEach(children => result.push(...children));

  if (parent) {
    result.push(appendChild(parent, identifier));
  }

  return {
    identifier,
    statements: result,
  };
}

function transformJSXText(path, parent) {
  const identifier = path.scope.generateUidIdentifier('text');
  const statements = [
    documentCreateTextNode(identifier, t.stringLiteral(path.node.value)),
  ];
  if (parent) {
    statements.push(appendChild(parent, identifier));
  }
  return {
    identifier,
    statements,
  };
}

function transformJSXExpression(path, parent) {
  switch (path.node.expression.type) {
    case 'BinaryExpression':
      return transformBinaryExpression(path.get('expression'), parent);
    case 'CallExpression':
      return transformCallExpression(path.get('expression'), parent);
    case 'LogicalExpression':
      return transformLogicalExpression(path.get('expression'), parent);
    case 'ConditionalExpression':
      return transformConditionalExpression(path.get('expression'), parent);
    default:
      return transformElement(path.get('expression'), parent);
  }

  throw new Error('Unknown expression type: ' + path.node.expression.type);
}

function transformBinaryExpression(path, parent) {
  const identifier = path.scope.generateUidIdentifier('result');
  const statements = [documentCreateTextNode(identifier, path.node)];
  if (parent) {
    statements.push(appendChild(parent, identifier));
  }
  return {
    identifier,
    statements,
  };
}

function transformCallExpression(path, parent) {
  if (isMapCallExpression(path.node)) {
    return transformMapCallExpresion(path, parent);
  }

  // normal call expression
  const identifier = path.scope.generateUidIdentifier('result');
  const statements = [declareConst(identifier, path.node)];
  if (parent) {
    statements.push(appendChild(parent, identifier));
  }
  return {
    identifier,
    statements,
  };
}

function transformMapCallExpresion(path, parent) {
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
        appendChild(parent, returnStatement.node.argument)
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

function normalizeBlockStatement(path) {
  if (path.node.type !== 'BlockStatement') {
    path.replaceWith(t.blockStatement([t.returnStatement(path.node)]));
  }
  return path;
}

function transformLogicalExpression(path, parent) {
  switch (path.node.operator) {
    case '&&':
      return transformLogicalAndExpression(path, parent);
    case '||':
      return transformLogicalOrExpression(path, parent);
  }
  throw new Error('Unknown logical operator: ' + path.node.operator);
}

function transformLogicalAndExpression(path, parent) {
  const identifier = path.scope.generateUidIdentifier('result');
  const consequent = transformElement(path.get('right'), parent);
  const statements = [ifBlock(path.node.left, consequent.statements)];

  return {
    identifier,
    statements,
  };
}

function transformLogicalOrExpression(path, parent) {
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

function transformConditionalExpression(path, parent) {
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

function transformIdentifier(path, parent) {
  const identifier = path.node;
  const statements = parent ? [appendChild(parent, identifier)] : [];
  return {
    identifier,
    statements,
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
      throw new Error('Unknown type: ' + node.type);
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

function documentCreateTextNode(identifier, node) {
  return declareConst(
    identifier,
    t.callExpression(
      t.memberExpression(
        t.identifier('document'),
        t.identifier('createTextNode')
      ),
      [node]
    )
  );
}

function declareConst(identifier, value) {
  return t.variableDeclaration('const', [
    t.variableDeclarator(identifier, value),
  ]);
}

function appendChild(parent, child) {
  switch (child.type) {
    case 'ArrayExpression':
      return t.expressionStatement(
        t.sequenceExpression(
          child.elements.map(c => appendChild(parent, c).expression)
        )
      );
    case 'JSXFragment':
      return t.expressionStatement(
        t.sequenceExpression(
          child.children
            .filter(isEmptyJSXTextNode)
            .map(c => appendChild(parent, c).expression)
        )
      );
    default:
      return t.expressionStatement(
        t.callExpression(
          t.memberExpression(parent, t.identifier('appendChild')),
          [child]
        )
      );
  }
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
function isEmptyJSXTextNode(node) {
  return !(node.type === 'JSXText' && node.value.trim() === '');
}

function toArray(list) {
  return t.arrayExpression(list);
}

function ifBlock(condition, thenCase, elseCase) {
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

function unshiftIntoBlock(path, statement) {
  let blockPath = path.scope.path;

  switch (blockPath.node.type) {
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
    case 'FunctionDeclaration':
      blockPath = blockPath.get('body');
      break;
  }

  const blockList = blockPath.get('body');
  let findParent = path;
  while (findParent) {
    if (blockList.includes(findParent)) {
      break;
    }
    findParent = findParent.parentPath;
  }
  if (findParent) {
    findParent.insertBefore(statement);
  } else {
    // give up
    blockPath.unshiftContainer('body', statement);
  }
}

function isMapCallExpression(node) {
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
