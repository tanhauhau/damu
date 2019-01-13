import jsx from '@babel/plugin-syntax-jsx';
import { declare } from '@babel/helper-plugin-utils';
import * as t from '@babel/types';
import { APPEND_CHILDREN, APPEND_CHILD_WITH_COMPONENT } from './boilerplates';
import Flags, { turnOnFlag } from './flags';

import { transform as transformElement } from './transform';
import { isEmptyJSXText, toArray } from './utils';
import { normalizeBlockStatement } from './utils/normalize-block-statement';
import { appendChild } from './api/append-child';

export default declare((api, options) => {
  api.assertVersion(7);
  return {
    name: 'babel-transform-damu-plugin',
    inherits: jsx,
    visitor: {
      JSXElement(path) {
        const { identifier, statements } = transformElement(path);
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
        enter(path) {
          if (
            path.has('arguments.0.type') &&
            ['ArrowFunctionExpression', 'FunctionExpression'].includes(
              path.get('arguments.0.type').node
            )
          ) {
            normalizeBlockStatement(path.get('arguments.0.body'));
          }
        },
        exit(path) {
          if (isDamuRender(path)) {
            const args = path.node.arguments;
            const elem = args[0];
            const target = args[1];
            path.replaceWith(appendChild(target, elem, path));
          }
        },
      },
      ImportDeclaration(path) {
        if (['react', 'react-dom'].includes(path.node.source.value)) {
          path.remove();
        }
      },
      ClassDeclaration(path) {
        if (
          path.has('superClass') &&
          ((path.get('superClass').isMemberExpression() &&
            path.get('superClass.object').isIdentifier({ name: 'React' }) &&
            path
              .get('superClass.property')
              .isIdentifier({ name: 'Component' })) ||
            path.get('superClass').isIdentifier({ name: 'Component ' }))
        ) {
          transformElement(path);
        }
      },
      Program: {
        exit(path) {
          const reactBindings = [
            path.scope.bindings.React,
            path.scope.bindings.ReactDOM,
          ];
          reactBindings.forEach(binding => {
            if (binding) {
              binding.path.remove();
            }
          });

          if (path[Flags.APPEND_CHILDREN]) {
            if (path[Flags.APPEND_COMPONENT]) {
              path.pushContainer('body', APPEND_CHILD_WITH_COMPONENT);
            } else {
              path.pushContainer('body', APPEND_CHILDREN);
            }
          }
        },
      },
    },
  };
});

function isDamuRender(path) {
  return (
    path.has('callee') &&
    path.get('callee').isMemberExpression() &&
    path.get('callee.object').isIdentifier({ name: 'ReactDOM' }) &&
    path.get('callee.property').isIdentifier({ name: 'render' })
  );
}

function unshiftIntoBlock(path, statement) {
  let blockPath = path.scope.path;
  switch (blockPath.node.type) {
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
    case 'FunctionDeclaration':
    case 'ClassMethod':
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
