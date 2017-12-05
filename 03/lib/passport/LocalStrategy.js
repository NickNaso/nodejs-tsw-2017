'use strict'

const VError = require('verror').VError
const LocalStrategy = require('passport-local').Strategy
const User = require('../../dac/User')

module.exports = function (passport) {

    // Used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        return done(null, user.id)
    })

    // Used to deserialize the user
    passport.deserializeUser(function (id, done) {

        User.findById(id)
        .then(user => {
            return done(null, user.toJSON())
        })
        .catch(err => {
            return done(err)
        })

    })

    // Set Local Strategy for authentication
    passport.use(new LocalStrategy(
        function (username, password, done) {
            
            User
            .findByUserName(username)
            .then(user => {
                if (user.checkPassword(password)) {
                    return done(null, false, {message: 'Incorrect password.'})
                } else {
                    return done(null, user.toJSON())
                }
            })
            .catch(err => {
                if (VError.hasCauseWithName('UserNotFoundError')) {
                    return done(null, false, {message: 'Incorrect username.'})
                } else {
                    return done(err)
                }
            })
            
        }
    ))

}