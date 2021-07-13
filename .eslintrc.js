module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': 'off',
    'semi': 'off',
    'eol-last': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'spaced-comment': 'off',
    'camelcase': 'off',
    'eqeqeq': 'warn',
    'object-property-newline': 'off',
    'no-prototype-builtins': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
  }
}
