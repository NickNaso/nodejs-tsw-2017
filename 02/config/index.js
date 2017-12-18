'use strict'

const config = require('./config.json')

const env = process.env.NODE_ENV || config.env

module.exports = config[env]

