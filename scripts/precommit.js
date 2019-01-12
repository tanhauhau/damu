const { execSync } = require('child_process');
const path = require('path');

const WEBSITE_FOLDER = path.join(__dirname, '../packages/website');
const DOCS_FOLDER = path.join(__dirname, '../docs');

if (execSync(`git diff HEAD ${WEBSITE_FOLDER}`, { encoding: 'utf-8' }) !== '') {
  execSync('yarn build', { cwd: WEBSITE_FOLDER, stdio: 'inherit' });
  execSync(`git add ${DOCS_FOLDER}`);
}
