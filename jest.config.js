module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/main/node/infrastructure/config/",
    "/src/main/node/core/domain/exceptions/",
    "/src/main/node/core/domain/utils/"
  ],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/main/node/core/$1',
    '^@domain/(.*)$': '<rootDir>/src/main/node/core/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/main/node/core/usecases/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/main/node/infrastructure/$1',
    '^@primary/(.*)$': '<rootDir>/src/main/node/infrastructure/primary/$1',
    '^@secondary/(.*)$': '<rootDir>/src/main/node/infrastructure/secondary/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};
