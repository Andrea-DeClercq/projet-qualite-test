import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
    },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": "error",
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];
