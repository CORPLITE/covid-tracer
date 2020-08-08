// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020
  },

  env: {
    browser: true,
    node: true
  },

  'extends': [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  rules: {
    'max-len': ["error", { "code": 240 }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    "vue/attribute-hyphenation": ['warn', 'always', {
      "ignore": [
        'businessId',
      ]
    }]
  }
}

