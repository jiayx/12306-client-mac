module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  plugins: [
    'html',
    'vue'
  ],
  rules: {
    eqeqeq: 'off',
    curly: 'warn',
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-unused-vars': 0,
    
    'max-len': 0,
    'prefer-template': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unreachable': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-restricted-syntax': process.env.NODE_ENV === 'production' ? 2 : 0
  },
}
