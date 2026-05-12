import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import vueTs from "@vue/eslint-config-typescript";

export default [
  { ignores: ["dist", "coverage"] },
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  ...vueTs(),
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "vue/multi-word-component-names": "off",
    },
  },
];
