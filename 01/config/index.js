'use strict'

const config = require('./config.json')

/**
 * Identify the right environment first based on system environment varialble
 * process.NODE_ENV then on value present on config and export the configuration
 * for all the application
 */

// module.exports ...