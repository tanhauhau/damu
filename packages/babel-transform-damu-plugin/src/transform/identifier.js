import {
  transform as transformElement,
  injectTransformer,
} from './trasnformers';
import { appendChild } from '../api/append-child';

injectTransformer('Identifier', transformIdentifier);
injectTransformer('MemberExpression', transformIdentifier);

export function transformIdentifier(path, parent) {
  const identifier = path.node;
  const statements = parent ? [appendChild(parent, identifier, path)] : [];
  return {
    identifier,
    statements,
  };
}
