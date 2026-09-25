// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    // Global Ignores must come first to apply everywhere
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "storybook-static/**",
      ".cache/**",
      "coverage/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;