module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
    '**/dynamic-tests.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
}
