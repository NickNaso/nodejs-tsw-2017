'use strict'

const VError = require('verror').VError

function noop () {}

function checkAuthAndRedirect (req, res, next) {
    next = next || noop
    if (req.isAuthenticated()) {
        next()
    }
    res.redirect('/')
}

function checkAuthAndResponse (req, res, next) {
    next = next || noop
    if (req.isAuthenticated()) {
        next()
    } else {
        const authErr = new VError({
            name: 'AuthenticationError'
        }, 'The request requires user authentication')
        next(authErr)
    }
}

module.exports = {
    checkAuthAndRedirect,
    checkAuthAndResponse
}