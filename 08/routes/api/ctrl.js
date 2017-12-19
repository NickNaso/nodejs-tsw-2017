'use strict'

const Post = require('../../dac/Post')
const Hertzy = require('hertzy')
const fqp = Hertzy.tune('posts')

module.exports = {
    
    
    async getPosts (req, res, next) {
        try {
            let posts = await Post.find()
            res.status(200).json(posts.map(v => {return v.toJSON()}))
        } catch (err) {
            next(err)
        }
    },

    async getPost (req, res, next) {
        try {
            let post = await Post.findById(req.params.id) 
            res.status(200).json(post.toJSON())
        } catch (err) {
            next(err)
        }
    },

    async updatePost (req, res, next) {
        try {
            let post = await Post.updateById(req.params.id, req.body)
            fqp.emit('post:update', post.toJSON())
            res.status(200).json(post.toJSON())
        } catch (err) {
            next(err)
        }
    }, 

    async createPost (req, res, next) {
        try {
            let post = await Post.create(req.body)
            fqp.emit('post:create', post.toJSON())
            res.status(201).json(post.toJSON())
        } catch (err) {
            next(err)
        }
    } 

}