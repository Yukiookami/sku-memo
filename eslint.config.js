import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      // 禁用 'vue/no-v-model-argument' 规则
      "vue/no-v-model-argument": "off",
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
