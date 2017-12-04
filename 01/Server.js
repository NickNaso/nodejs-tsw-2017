'use strict'

const http = require('http')
const express = require('express')
const body = require('compression')
const time = require('response-time')
const responsePoweredBy = require('response-powered-by')

function createServer () {
    const app = express()

    app.use(errorhandler())

    // Set express server port
    app.set('port', process.env.PORT || 5000)
    app.use(compression())
    app.use(morgan('dev'))
    app.use(responsePoweredBy("@NickNaso"))
    app.use(time())

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

