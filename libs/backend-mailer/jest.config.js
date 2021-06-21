module.exports = {
  displayName: 'backend-mailer',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/backend-mailer',
  coverageThreshold: { // TODO: bump unit test coverage and remove this override
    global: {
      branches: 64.29,
      functions: 25,
      lines: 36.54,
      statements: 39.66,
    },
  },
};
