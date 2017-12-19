'use strict'

const VError = require('verror').VError
const createServer = require('./Server')
const Mongo = require('./lib/db')

async function run () {
    try {
        /**
         * Use Mongo API to connect to database
         */
        // YOUR CODE HERE
        createServer()
    } catch (err) {
        console.error('Sorry error happened on starting the application ... ')
        console.error(VError.fullStack(err))
    }
    
}

run()