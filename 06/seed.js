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
        await Promise.all([
            db.collection('posts').insertMany(posts),
            db.collection('users').insertMany(users.map(crypt))
        ])
        Mongo.close()
        process.exit(0)
    } catch (err) {
        console.error('Error happened executing seeds script')
        console.error(VError.fullStack(err))
        Mongo.close()
    }
}

seed()