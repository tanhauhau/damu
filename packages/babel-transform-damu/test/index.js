import test from 'ava';
const fs = require('fs');
const path = require('path');
const transform = require('../src/transform');

const baseFolder = path.join(__dirname, '../fixtures');
const fixtures = fs.readdirSync(baseFolder);

for (const fixture of fixtures) {
  test(fixture, t => {
    const input = fs.readFileSync(
      path.join(baseFolder, fixture, 'input.js'),
      'utf-8'
    );
    const output = fs.readFileSync(
      path.join(baseFolder, fixture, 'output.js'),
      'utf-8'
    );
    t.is(transform(input), output);
  });
}
