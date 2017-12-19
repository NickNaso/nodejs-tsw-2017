'use strict'

const express = require('express')
const ctrl = require('./ctrl')
//const checkAuthAndRedirect = require('../../middlewares/is-auth').checkAuthAndRedirect

module.exports = function (app) {

    // SOMETIMES YOU WANT TO DO WITH MAIN EXPRESS APPLICATION

    const web = express.Router()

    web.get('/', ctrl.index)

    //web.get('/login', ctrl.login)
    
    //web.get('/admin', ctrl.admin)
    
    return web
    
}