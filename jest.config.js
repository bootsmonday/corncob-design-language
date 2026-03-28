module.exports = {
  testEnvironment: '@happy-dom/jest-environment',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    '<rootDir>/_archive/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '/node_modules/',
  ],
  collectCoverageFrom: ['src/**/*.js', '!src/index.js', '!src/**/*.test.js'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
