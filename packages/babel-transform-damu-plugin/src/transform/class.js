import * as t from '@babel/types';
import {
  transform as transformElement,
  injectTransformer,
} from './trasnformers';

injectTransformer('ClassDeclaration', transformClassDeclaration);

function transformClassDeclaration(path) {
  // remove super
  removeSuper(path);
  const setStateMap = {};
  path.traverse({
    MemberExpression(cpath) {
      if (
        cpath.get('object').isThisExpression() &&
        cpath.get('property').isIdentifier({
          name: 'setState',
        })
      ) {
        const args = cpath.parentPath.get('arguments.0');
        if (args.isObjectExpression()) {
          // TODO: split object expression to single object
          args.get('properties').forEach(property => {
            const key = property.get('key.name').node;

            setStateMap[key] = setStateMap[key] || [];
            setStateMap[key].push(cpath.parentPath);
          });
        }
      }
    },
  });

  for (const stateKey in setStateMap) {
    const stateIdentifier = path.scope.generateUidIdentifier('set' + stateKey);
    path
      .get('body')
      .pushContainer(
        'body',
        t.classMethod(
          'method',
          stateIdentifier,
          [t.identifier(stateKey)],
          t.blockStatement([
            t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.memberExpression(t.thisExpression(), t.identifier(stateKey)),
                t.identifier(stateKey)
              )
            ),
          ])
        )
      );
    const callers = setStateMap[stateKey];
    callers.forEach(caller => {
      const node = caller.node;

      caller.replaceWithMultiple(
        t.callExpression(
          t.memberExpression(t.thisExpression(), stateIdentifier),
          [node.arguments[0].properties[0].value]
        )
      );
    });
  }

  // this.state = {xxx} replace to this.xxx
  const constructor = path
    .get('body.body')
    .find(method => method.get('key').isIdentifier({ name: 'constructor' }));
  if (constructor) {
    const thisStateDeclaration = constructor
      .get('body.body')
      .find(statement => {
        const expression = statement.get('expression');
        return (
          expression.isAssignmentExpression() &&
          expression.get('left').isMemberExpression() &&
          expression.get('left.object').isThisExpression() &&
          expression.get('left.property').isIdentifier({ name: 'state' }) &&
          expression.get('right').isObjectExpression()
        );
      });
    if (thisStateDeclaration) {
      thisStateDeclaration.replaceWithMultiple(
        thisStateDeclaration
          .get('expression.right.properties')
          .map(property => {
            const key = property.node.key;
            const value = property.node.value;
            return t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.memberExpression(t.thisExpression(), key),
                value
              )
            );
          })
      );
    }
  }
}

function removeSuper(path) {
  // remove super class
  path.get('superClass').remove();
  // remvoe super() in constructor
  const constructor = path
    .get('body.body')
    .find(method => method.get('key').isIdentifier({ name: 'constructor' }));
  if (constructor) {
    const callSuper = constructor
      .get('body.body')
      .find(
        statement =>
          statement.get('expression').isCallExpression() &&
          statement.get('expression.callee').isSuper()
      );
    if (callSuper) {
      callSuper.remove();
    }
  }
}
