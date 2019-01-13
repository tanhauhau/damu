export function getIdentifierName(node) {
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
