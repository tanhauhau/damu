import * as t from '@babel/types';
import Flags, { turnOnFlag } from '../flags';

export function appendChild(parent, child, path) {
  turnOnFlag(path, Flags.APPEND_CHILDREN);

  return t.expressionStatement(
    t.callExpression(t.identifier('__damu__appendChildren'), [parent, child])
  );
}
