const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-portfolio',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-portfolio',
  coverageThreshold: { // TODO: bump unit test coverage and remove this override
    global: {
      branches: 2.67,
      functions: 16.67,
      lines: 44.84,
      statements: 46.73,
    },
  },
};
