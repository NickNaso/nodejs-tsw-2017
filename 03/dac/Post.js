'use strict'

const VError = require('verror').VError
const Post = require('../resources/Post')
const Mongo = require('../lib/db')

const POSTS = 'posts'
const collection = Mongo.db.collection(POSTS)

module.exports = {

    POSTS: collection,

    async find () {
        try {
            return (await collection.find({}).toArray())
                            .map(v => {return new Post(v)})
        } catch (err) {
            throw new VError({
                name: 'PostError',
                cause: err
            }, 'Error happened retrieving posts')
        }
    },

    async findById (id) {
        try {
            let p = await collection.findOne({_id: id})
            if (p) {
                return new Post(p)
            } else {
                throw new VError({
                    name: 'PostNotFoundError'
                }, `Post with id: ${id} seems to not exists`)
            }
        } catch (err) {
            throw new VError({
                name: 'PostError',
                cause: err
            }, `Error happened retrieving post with id: ${id}`)
        }

    },

    async updateById (id, data) {
        try {
            let p = await collection.findOneAndUpdate(
                {_id: id}, 
                {$set: data}, 
                {returnOriginal: false}
            )
            return new Post(p)
        } catch (err) {
            throw new VError({
                name: 'PostError',
                cause: err
            }, `Error happened retrieving post with id: ${id}`)
        }
    },

    async create (data) {
        try {
            let p = await collection.insertOne(data)
            return new Post(p)
        } catch (err) {
            throw new VError({
                name: 'PostError',
                cause: err
            }, `Error happened creating new post`)
        }
    }

}