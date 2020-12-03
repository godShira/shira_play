module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'error',
    'no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1, 10, 100],
        ignoreArrayIndexes: true,
        enforceConst: true
      }
    ]
  }
}
