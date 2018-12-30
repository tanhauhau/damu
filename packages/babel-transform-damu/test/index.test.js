import runner from '@babel/helper-transform-fixture-test-runner';

runner(
  __dirname + '/fixtures',
  'babel-transform-damu',
  {},
  {
    plugins: [require.resolve('../src')],
  }
);
