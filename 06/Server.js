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

    // Install and import ejs (template engine)
    // Set ejs as template engine
    // Set the views property to point the folder views
    // To get help take a look at express documentation here
    // http://expressjs.com/en/4x/api.html#app.engine

    // HERE YOUR CODE

    // Use static middleware to serve the assets of the application
    // Set the static middleware to pint at public folder
    // To get help take a look at axpress documentation 
    // http://expressjs.com/en/4x/api.html#express.static

    // HERE YOUR CODE

    // Install serve-favicon middleware
    // Documentation here:
    // https://www.npmjs.com/package/serve-favicon
    // Set the serve-favicon middleware to pint at public/favicon.ico

    // HERE YOUR CODE
    
    app.use(body.urlencoded({extended: false, inflate: true}))
    app.use(body.json({strict: true, inflate: true}))

    
    
    // Routes
    app.use('/', require('./routes/web')(app))
    app.use('/api', require('./routes/api')(app))

    // Create http server and attach express app on it
    http.createServer(app).listen(app.get('port'), cfg.server.host, () => {
        console.log(`Server started at ${cfg.server.protocol}://${cfg.server.host}:${app.get('port')}/`)
    })
}