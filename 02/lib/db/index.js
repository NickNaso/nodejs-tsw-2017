'use strict'

const MongoClient = require('mongodb').MongoClient
const VError = require('verror').VError
const cfg = require('../../config')

let dbConnection = null

module.exports = {

    get db() {
        return dbConnection
    },

    async connect() {
      try {
          /**
           * Refer to MongoDB driver documentation here:
           * http://mongodb.github.io/node-mongodb-native/2.2/api/
           * Write code to get connection to MongoDB using parameter from your
           * config module:
           * database -> host
           * database -> protocol
           * database -> port"
           * database -> name
           */
          // let db = HERE YOUR CODE 
          dbConnection = db
          return db
      } catch (err) {
          throw new VError({
            cause: err,
            name: 'DbConnectionError'
          }, 'Error happened connecting database')
      }
    },

    close() {
        if (dbConnection) {
            dbConnection.close()
        }
    }

}