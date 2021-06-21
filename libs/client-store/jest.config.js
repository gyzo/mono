const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-store',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-store',
  coverageThreshold: { // TODO: bump unit test coverage and remove this override
    global: {
      branches: 14.49,
      functions: 16.92,
      lines: 29.12,
      statements: 30.62,
    },
  },
};
