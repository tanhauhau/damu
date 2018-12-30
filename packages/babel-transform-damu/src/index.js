import jsx from '@babel/plugin-syntax-jsx';
import { declare } from '@babel/helper-plugin-utils';

export default declare((api, options) => {
  console.log(jsx.default);
  api.assertVersion(7);
  return {
    name: 'identifier reverse',
    inherits: jsx,
    visitor: {},
  };
});
