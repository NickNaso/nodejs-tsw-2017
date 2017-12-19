'use strict'

const express = require('express')
//const passport = require('passport')
const ctrl = require('./ctrl')
//const checkAuthAndResponse = require('../../middlewares/is-auth').checkAuthAndResponse

module.exports = function (app) {

    // SOMETIMES YOU WANT TO DO WITH MAIN EXPRESS APPLICATION

    const api = express.Router()

    api.get('/posts', ctrl.getPosts)

    api.get('/posts/:id', ctrl.getPost)

    api.put('/posts/:id', ctrl.updatePost)

    api.post('/posts', ctrl.createPost)

    return api
    
}