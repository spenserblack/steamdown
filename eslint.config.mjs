import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["babel.config.js", "jest.config.js", "scripts/*", "**/__tests__/", "**/dist/"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["packages/cli/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: { ...globals.node } },
  },
];
