const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-unit-testing',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-unit-testing',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 1.18,
      functions: 0,
      lines: 22.73,
      statements: 25.75,
    },
  },
};
