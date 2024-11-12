'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:5205"',
  EXCEPTION_LESS_API_KEY: '"1L1zCqr7PW4JnKlpz7Lr4CgYIdLAf7CDn01TtxFM"',
})
