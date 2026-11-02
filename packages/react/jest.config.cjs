const path = require('path');

module.exports = {
  rootDir: __dirname,
  testEnvironment: '@happy-dom/jest-environment',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, '../../babel.config.js') },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
