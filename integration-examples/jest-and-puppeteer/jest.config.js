'use strict';

const puppeteerPreset = require('jest-puppeteer-preset/jest-preset.json');

// The run id should be unique across runs
const runId = Date.now().toString();

module.exports = {
    ...puppeteerPreset,
    reporters: [
        ['@testim/root-cause-jest/lib/reporter/default', { runId }],
    ],
    setupFilesAfterEnv: [
        ...puppeteerPreset.setupFilesAfterEnv,
        '@testim/root-cause-jest/lib/forSetupFilesAfterEnv'
    ],
    globals: {
        runId,
    },
};
