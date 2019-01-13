import * as t from '@babel/types';
import { declareConst } from '../../utils';

export function documentCreateElement(identifier, elemName) {
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
