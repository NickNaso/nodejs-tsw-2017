'use strict'

const VError = require('verror').VError
const Post = require('../resources/Post')
const Mongo = require('../lib/db')
const ObjectId = require('mongodb').ObjectId

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
            let p = await collection.findOne({_id: ObjectId(id)})
            if (p) {
                return new Post(p)
            } else {
                throw new VError({
                    name: 'PostNotFoundError'
                }, `Post with id: ${id} seems to not exists`)
            }
        } catch (err) {
            console.log(err)
            throw new VError({
                name: 'PostError',
                cause: err
            }, `Error happened retrieving post with id: ${id}`)
        }

    },

    async updateById (id, data) {
        try {
            let p = await collection.findOneAndUpdate(
                {_id: ObjectId(id)}, 
                {$set: data}, 
                {returnOriginal: false}
            )
            return new Post(p.value)
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
            data._id = p.insertedId
            return new Post(data)
        } catch (err) {
            throw new VError({
                name: 'PostError',
                cause: err
            }, `Error happened creating new post`)
        }
    }

}