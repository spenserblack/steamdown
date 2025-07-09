module.exports = {
  // NOTE .(test|spec).(m|c)?(j|t)s files in __tests__ folders
  testMatch: ["**/__tests__/**/*.(spec|test).?([mc])[jt]s"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // NOTE Disables node_modules from being ignored during transformation.
  transformIgnorePatterns: [],
};
