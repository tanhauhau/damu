const transformers = {};

export function transform(path, parent) {
  const transformer = transformers[path.node.type];
  if (typeof transformer === 'function') {
    return transformer(path, parent);
  }
  throw new Error('Unknown expression type: ' + path.node.type);
}

export function injectTransformer(type, transformer) {
  transformers[type] = transformer;
}
