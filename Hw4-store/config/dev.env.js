'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  SERVER_URL: '"https://vue-course-api.hexschool.io"',
  API_PATH: '"cynthia"'
})
