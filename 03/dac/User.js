'use strict'

const VError = require('verror').VError
const User = require('../resources/User')
const Mongo = require('../lib/db')

const USERS = 'users'
const collection = Mongo.db.collection(USERS)

module.exports = {

    USERS: collection
    
}