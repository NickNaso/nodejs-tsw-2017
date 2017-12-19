'use strict'

const VError = require('verror').VError
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../../dac/User').USERS
const User = require('../../resources/User')




    // Used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        return done(null, user._id)
    })

    // Used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Users
        .findOne({_id: id})
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err)
        })
    })

    // Set Local Strategy for authentication
    passport.use(new LocalStrategy(
        function (username, password, done) {
            Users
            .findOne({username: username})
            .then(user => {
                if (user) {
                    let u = new User(user)
                    if (u.checkPassword(password)) {
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'Incorrect password'})
                    }
                } else {
                    return done(null, false, {message: 'Incorrect username'})
                }
            })
            .catch(err => {
                return done(err)
            })
        }
    ))

