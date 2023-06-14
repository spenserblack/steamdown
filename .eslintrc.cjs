const baseRules = {
  'array-callback-return': 'error',
  'no-await-in-loop': 'warn',
  'no-constant-binary-expression': 'warn',
  'no-self-compare': 'warn',
  'arrow-body-style': 'warn',
  'camelcase': 'warn',
  'curly': 'error',
  'func-names': 'error',
  'logical-assignment-operators': 'warn',
  'no-case-declarations': 'error',
  'no-eval': 'error',
  'no-multi-assign': 'error',
  'no-mixed-operators': 'warn',
  'no-sequences': 'error',
  'no-useless-computed-key': 'warn',
  'no-var': 'error',
  'object-shorthand': 'warn',
  'one-var': ['error', 'never'],
  'prefer-const': 'warn',
  'prefer-destructuring': 'warn',
  'prefer-object-spread': 'warn',
  'prefer-rest-params': 'warn',
  'prefer-spread': 'warn',
  'radix': 'error',
  'sort-imports': 'warn',
  'sort-keys': 'warn',
  'yoda': 'warn',
  'arrow-parens': 'error',
  // Assume the developer knows what they're doing
  'no-fallthrough': 'off',
};

const typescriptRules = Object.entries({
  'array-type': 'error',
  'consistent-generic-constructors': 'warn',
  'explicit-member-accessibility': 'error',
  'member-ordering': 'warn',
  'no-confusing-non-null-assertion': 'error',
  'no-import-type-side-effects': 'warn',
  'prefer-as-const': 'warn',
  'prefer-optional-chain': 'warn',
  'sort-type-constituents': 'warn',
  'no-duplicate-imports': 'warn',
  'no-extra-parens': 'warn',
  'no-invalid-this': 'error',
  // Assume the developer knows what they're doing
  'no-explicit-any': 'off',
  'no-non-null-assertion': 'off',
}).reduce((obj, [key, value]) => ({ ...obj, [`@typescript-eslint/${key}`]: value }), {})

const rules = {
  ...baseRules,
  ...typescriptRules,
}

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
  rules,
};
