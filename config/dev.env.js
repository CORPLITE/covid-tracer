'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  LOG_LEVEL: 'VERBOSE',
  NODE_ENV: '"development"'
})
