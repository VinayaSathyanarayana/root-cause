set -ex

ARGS="$@"

yarn workspace @testim/root-cause-core test "$ARGS"
yarn workspace @testim/root-cause-mocha test "$ARGS"
yarn workspace @testim/root-cause-jest test "$ARGS"
yarn workspace @testim/root-cause-jest test:integration "$ARGS"

# yarn ts-node infra-scripts/codelessTestRun.ts "$ARGS"
