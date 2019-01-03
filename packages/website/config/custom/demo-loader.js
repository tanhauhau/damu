const path = require('path');
const fs = require('fs');

module.exports = function(code) {
  const folder = path.dirname(this.resourcePath);
  this.addContextDependency(folder);

  const files = fs.readdirSync(folder);
  const demos = files.reduce((result, file) => {
    if (file !== 'index.js') {
      const content = fs.readFileSync(path.join(folder, file), 'utf-8');
      result[path.basename(file).replace(path.extname(file), '')] = content;
    }
    return result;
  }, {});
  return 'module.exports = ' + JSON.stringify(demos);
};
