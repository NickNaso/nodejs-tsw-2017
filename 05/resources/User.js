'use strict'

const bcrypt = require('bcrypt')

module.exports = User

function User (attributes = {}) {
    this._idAttribute = '_id'
    this._id = attributes._id || null
    this._firstName = attributes.firstName || ''
    this._lastName = attributes.lastName || ''
    this._username = attributes.username || ''
    this._password = attributes.password || ''
}

User.prototype.toJSON = function toJSON () {
    return {
        _id: this._id,
        author: this._author,
        title: this._title,
        body: this._body
    }
}

User.prototype.checkPassword = function checkPassword (password) {
    return bcrypt.compareSync(password, this._password)
}

User.createPassword = function createPassword (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}