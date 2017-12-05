'use strict'

const VError = require('verror').VError
const User = require('../resources/User')
const Mongo = require('../lib/db')

const USERS = 'users'
const collection = Mongo.db.collection(USERS)

module.exports = {

    USERS: collection,

    findById (id) {
        return collection
            .findOne({_id: id})
            .then(user => {
                if (user) {
                    return new User(user)
                } else {
                    throw new VError({
                        name: 'UserNotFoundError'
                    }, `User with id: ${id} seems to not exists`)
                }
            })
            .catch(err => {
                throw err 
            })
    },

    findByUserName(username) {
        return collection
            .findOne({username: username})
            .then(user => {
                if (user) {
                    return new User(user)
                } else {
                    throw new VError({
                        name: 'UserNotFoundError'
                    }, `User with username: ${username} seems to not exists`)
                }
            })
            .catch(err => {
                throw new VError({
                    name: 'UserError',
                    cause: err
                }, `Error happened retrieving user with username: ${username}`)
            })
    }
}