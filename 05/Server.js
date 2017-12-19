'use strict'

const http = require('http')
const express = require('express')
const compression = require('compression')
const time = require('response-time')
const responsePoweredBy = require('response-powered-by')
const errorhandler = require('errorhandler')
const morgan = require('morgan')
const cfg = require('./config')
const body = require('body-parser')

module.exports = createServer

function createServer () {
    const app = express()

    app.use(errorhandler())

    // Set express server port

  
    app.set('port', process.env.PORT || cfg.server.port)

    app.use(time())
    app.use(compression())
    app.use(morgan('dev'))
    app.use(responsePoweredBy("@NickNaso"))

    // Take a look at body parser documentation just to understand its purpose
    // and discuss about that

    app.use(body.urlencoded({extended: false, inflate: true}))
    app.use(body.json({strict: true, inflate: true}))

    // Take a look at this part of the express documentation
    // http://expressjs.com/en/4x/api.html#router.use 
    // and try to complete the statements loading the api exported on 
    // folder routes -> api
    
    // COMPLETE THIS
    app.use('/api', /* HERE YOUR CODE */)

    // Create http server and attach express app on it
    http.createServer(app).listen(app.get('port'), cfg.server.host, () => {
        console.log(`Server started at ${cfg.server.protocol}://${cfg.server.host}:${app.get('port')}/`)
    })
}