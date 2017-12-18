'use strict'

const http = require('http')
const express = require('express')
const compression = require('compression')
const time = require('response-time')
const responsePoweredBy = require('response-powered-by')
const errorhandler = require('errorhandler')
const morgan = require('morgan')
const cfg = require('./config')

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
    http.createServer(app).listen(app.get('port'), cfg.server.host, () => {
        console.log(`Server started at ${cfg.server.protocol}://${cfg.server.host}:${app.get('port')}/`)
    })
}