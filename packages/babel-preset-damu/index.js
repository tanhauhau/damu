import { declare } from '@babel/helper-plugin-utils';
import syntaxClassProperties from '@babel/plugin-syntax-class-properties';
import transformDamu from '@damu/babel-transform-damu-plugin';

export default declare((api, opts) => {
  api.assertVersion(7);

  return {
    plugins: [syntaxClassProperties, transformDamu],
  };
});
