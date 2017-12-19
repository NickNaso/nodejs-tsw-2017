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
          let conn = `${cfg.database.protocol}://${cfg.database.host}:${cfg.database.port}/${cfg.database.name}`
          let db = await MongoClient.connect(conn)
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