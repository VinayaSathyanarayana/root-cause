// jest can't transpile transformers on the fly so we help him
// https://github.com/facebook/jest/issues/10105

/* eslint-disable import/no-extraneous-dependencies */
const tsNode = require('ts-node');

tsNode.register({
  transpileOnly: true,
  compilerOptions: require('@testim/root-cause-jest/tsconfig').compilerOptions,
});

const Reporter = require('@testim/root-cause-jest/lib/reporter/default');

module.exports = Reporter;
