import runner from '@babel/helper-transform-fixture-test-runner';

runner(
  __dirname + '/fixtures',
  'babel-transform-damu',
  {},
  {
    sourceType: 'unambiguous',
    plugins: [require.resolve('../src')],
  }
);
