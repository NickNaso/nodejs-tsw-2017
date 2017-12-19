'use strict'

const express = require('express')
//const passport = require('passport')
const ctrl = require('./ctrl')
//const checkAuthAndResponse = require('../../middlewares/is-auth').checkAuthAndResponse

module.exports = function (app) {

    // SOMETIMES YOU WANT TO DO WITH MAIN EXPRESS APPLICATION

    const api = express.Router()

    // Route to execute the login process
    /*api.post('/auth/login', passport.authenticate('local', {
        // Redirect to search panel
        successRedirect: '/admin',
        // Redirect back to login page if there is an error
        failureRedirect: '/login',
        // Allow flash message in case of error
        failureFlash: true
    }))*/

    // Route to execute logout process
    //api.get('/auth/logout', ctrl.logout)

    api.get('/posts', ctrl.getPosts)

    api.get('/posts/:id', ctrl.getPost)

    api.put('/posts/:id', ctrl.updatePost)

    api.post('/posts', ctrl.createPost)

    return api
    
}