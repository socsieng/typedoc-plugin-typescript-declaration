module.exports = {
  roots: [
    '<rootDir>/bin',
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
    '**/*-tests.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
}
