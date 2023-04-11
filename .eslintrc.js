module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    extends: ['eslint:recommended', "plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-console": "warn"
    }
};
