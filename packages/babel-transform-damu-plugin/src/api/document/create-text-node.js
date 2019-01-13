import * as t from '@babel/types';
import { declareConst } from '../../utils';

export function documentCreateTextNode(identifier, node) {
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
