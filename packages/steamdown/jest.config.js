module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.{test,spec}.{js,ts}'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
