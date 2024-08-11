module.exports = {
   root: true,
   env: {
      browser: true,
      es2021: true,
      node: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['prettier'],
   rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   },
};