// eslint.config.js
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["coverage/**", "dist/**", ".vite/**"],
  },

  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  ...pluginVue.configs["flat/essential"],

  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
]);
