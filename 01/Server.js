'use strict'

const http = require('http')
const express = require('express')
const compression = require('compression')
const time = require('response-time')
const responsePoweredBy = require('response-powered-by')
const errorhandler = require('errorhandler')
const morgan = require('morgan')

/**
 * Import your config module
 */

// HERE YOUR CODE

module.exports = createServer

function createServer () {
    const app = express()

    app.use(errorhandler())

    // Set express server port

    /**
     * Use value under server -> port to dynamically assign the port to express app
     * Remove 5000 and substitute it with right config value
     */
    // YOUR CODE HERE
    app.set('port', process.env.PORT || 5000)

    app.use(time())
    app.use(compression())
    app.use(morgan('dev'))
    app.use(responsePoweredBy("@NickNaso"))

    // Routes
    app.get('/test', (req, res, next) => {
        res.status(200).json({message: 'Ok from my first api endpoint'})
    })

    app.get('/error', (req, res, next) => {
        try {
            throw new Error('Error on handlig the request')
            res.send('My message from error request handler')
        } catch (err) {
            next(err)
        }  
    })

    // Create http server and attach express app on it
    
    /**
     * Use value under server -> host to dynamically assign the host server
     * Remove '0.0.0.0' and substitute it with right config value 
     */
    // YOUR CODE HERE
    http.createServer(app).listen(app.get('port'), '0.0.0.0', () => {

        /**
         * Use value under server -> protocol and server -> host to print the
         * rigth values of the host and port on which the server binded
         * Remove 'http://localhost' and substitute it with right config values 
         */
        // YOUR CODE HERE
        console.log("Server started at http://localhost:" + app.get('port') + "/")
    })
}