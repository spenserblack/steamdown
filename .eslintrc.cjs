module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  overrides: [
    {
      files: ["**/bin/*.js"],
      env: {
        node: true,
      },
    },
  ],
};
