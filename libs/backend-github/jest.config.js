module.exports = {
  displayName: 'backend-github',
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
  coverageDirectory: '../../coverage/libs/backend-github',
  coverageThreshold: { // TODO: bump unit test coverage and remove this override
    global: {
      branches: 12.5,
      functions: 21.05,
      lines: 45.65,
      statements: 45.45,
    },
  },
};
