import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["babel.config.js", "jest.config.js", "**/*.test.js"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
