'use strict'

module.exports = Post

function Post (attributes = {}) {
    this._idAttribute = '_id'
    this._id = attributes._id || null
    this._author = attributes.author || ''
    this._title = attributes.title || ''
    this._body = attributes.body || ''
    
}

Post.prototype.toJSON = function toJSON () {
    return {
        _id: this._id,
        author: this._author,
        title: this._title,
        body: this._body
    }
}
 