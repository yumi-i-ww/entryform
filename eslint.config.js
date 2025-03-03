import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import typescriptParser from "@typescript-eslint/parser";
import * as importPlugin from "eslint-plugin-import";
import globals from "globals";

// NOTE: plugin-importがflatConfigに対応したら削除
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig} */
const defaultConfig = {
  name: "default-config",
  files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: typescriptParser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

/** @type {import("eslint").Linter.FlatConfig} */
const importConfig = {
  name: "import-config",
  rules: {
    ...importPlugin.configs.errors.rules,
    ...importPlugin.configs.warnings.rules,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": 0,
    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        pathGroups: [
          { pattern: "~/**", group: "parent" },
          {
            group: "parent",
            pattern: "~/components/**",
          },
          {
            group: "type",
            pattern: "~/types",
          },
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "no-console": ["warn", { allow: ["error", "warn", "info"] }],
  },
};

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  defaultConfig,
  ...compat.extends("plugin:import/recommended"),
  importConfig,
];
