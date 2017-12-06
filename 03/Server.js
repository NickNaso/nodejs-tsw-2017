'use strict'

const http = require('http')
const cookie = require('cookie-parser')
const session = require('express-session')
const body = require('body-parser')
const flash = require('connect-flash')
const path = require('path')
const serve = require('express').static
const favicon = require('serve-favicon')
const passport = require('passport')
const express = require('express')
const compression = require('compression')
const time = require('response-time')
const responsePoweredBy = require('response-powered-by')
const errorhandler = require('errorhandler')
const morgan = require('morgan')
const cfg = require('./config')

function onStart() {
    let port = cfg.server.port
    let protocol = cfg.server.protocol
    let host = cfg.server.host
    console.log(`Server started at ${protocol}://${host}:${port}/`)
}

module.exports = createServer

function createServer () {

    const app = express()

    const server = http.Server(app)

    app.use(errorhandler())

    // Set express server port
    app.set('port', process.env.PORT || cfg.server.port)

    app.use(time())
    app.use(compression())
    app.use(morgan('dev'))
    app.use(responsePoweredBy("@NickNaso"))

    app.set('view engine', 'ejs');
    app.engine('ejs', require('ejs').__express);
    app.set('views', path.join(__dirname, 'views'))
    
    app.use(serve(path.join(__dirname, 'public')))
    app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
    
    app.use(body.urlencoded({extended: false, inflate: true}))
    app.use(body.json({strict: true, inflate: true}))

    // Set the cookie parser middleware
    //app.use(cookie("tsw-secret-cookie-key"))

    // Set the session middleware

    // Option for session
    /*let sessOpts = {
        secret: "tsw-secret-session-cookie-key",
        name: "tsw.SID",
        resave: true,
        saveUninitialized: false,
        cookie: {
            "secure": false,
            "maxAge": 3600000
        }
    }*/
    //app.use(session(sessOpts))

    // Set connect flash middleware
    //app.use(flash())

    // Initialize passport
    //app.use(passport.initialize())
    //app.use(passport.session())

    // Attach cutom passport configuration
    //require('./lib/passport').LocalStrategy
    
    // Routes
    app.use('/', require('./routes/web')(app))
    app.use('/api', require('./routes/api')(app))

    // Create http server and attach express app on it
    server.listen(app.get('port'), cfg.server.host, onStart)
    

}