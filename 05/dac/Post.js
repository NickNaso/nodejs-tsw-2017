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
            // Find all posts stored on the mongodb collection posts and return them
            // To get help see the mongodb driver documentation
            // http://mongodb.github.io/node-mongodb-native/2.2/api/
            // Try to use find method
            // You need to return an array of Post object
            
            // HERE YOUR CODE

        } catch (err) {
            throw new VError({
                name: 'PostError',
                cause: err
            }, 'Error happened retrieving posts')
        }
    },

    async findById (id) {
        try {
            // Find post by its id from the mongodb collection posts and return it
            // To get help see the mongodb driver documentation
            // http://mongodb.github.io/node-mongodb-native/2.2/api/
            // Try to use find method
            // You need to return a Post object
            
            // HERE YOUR CODE

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
            // Insert a new post and then return it
            // To get help see the mongodb driver documentation
            // http://mongodb.github.io/node-mongodb-native/2.2/api/
            // Try to use the insertOne method
            // You need to return the inserted Post object
            
            // HERE YOUR CODE

        } catch (err) {
            
            // Create the right error for this method

            // YOUR CODE HERE

        }
    }

}