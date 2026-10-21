import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import {defineConfig} from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: {js},
    extends: ["js/recommended"],
    languageOptions: {globals: globals.browser},
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: {max: 3},
        multiline: {max: 1}
      }],
      'vue/singleline-html-element-content-newline': 'off'
    }
  },

  pluginVue.configs["flat/essential"],
]);
