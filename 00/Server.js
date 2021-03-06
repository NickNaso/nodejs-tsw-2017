'use strict'

const http = require('http')
const express = require('express')
const compression = require('compression')
const time = require('response-time')
const responsePoweredBy = require('response-powered-by')
const errorhandler = require('errorhandler')
const morgan = require('morgan')

module.exports = createServer

function createServer () {
    const app = express()

    /**
     * Add the dafualt errorhandler for express -> errorhandler -> https://www.npmjs.com/package/errorhandler
     */

    // HERE YOUR CODE

    // Set express server port
    app.set('port', process.env.PORT || 5000)
    
    /**
     * Add the following middlewares to express configurations
     * response-time -> https://www.npmjs.com/package/response-time
     * compression -> https://www.npmjs.com/package/compression
     * response-powered-by -> https://www.npmjs.com/package/response-powered-by
     * morgan with 'dev' option -> https://www.npmjs.com/package/morgan
     * 
     */

     // HERE YOUR CODE
    

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
    http.createServer(app).listen(app.get('port'), '0.0.0.0', () => {
        console.log("Server started at http://localhost:" + app.get('port') + "/")
    })
}