module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "simple-import-sort"],
  rules: {
    "no-restricted-imports": ["error", { patterns: ["..*", "modules*"] }],
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": [
      "error",
      { groups: [["^[^#.]"], ["#/"], ["./"]] },
    ],
    "simple-import-sort/exports": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
