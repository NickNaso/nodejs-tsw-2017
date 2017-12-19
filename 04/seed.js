'use strict'

const bcrypt = require('bcrypt')
const VError = require('verror').VError
const Mongo = require('./lib/db')
const posts = require('./seeds/posts.json')
const users = require('./seeds/users.json')


function crypt (user) {
    user.password =  bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    return user
}

async function seed() {
    try {
        const db = await Mongo.connect()
        // Populate mongodb collection named 'posts' with data came from 'posts.json'
        // Populate mongodb collection named 'users' with data came from 'users.json'
        // To help you take a look at mongodb driver documentation at:
        // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insertMany

        // HERE YOUR CODE

        Mongo.close()
        process.exit(0)
    } catch (err) {
        console.error('Error happened executing seeds script')
        console.error(VError.fullStack(err))
    }
}

seed()