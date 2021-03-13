module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["react", "prettier"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "prettier",
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
  rules: {},
};
