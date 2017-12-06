'use strict'

const socketIO = require('socket.io')

let io = null
let ws = null

module.exports = {
    create(server) {
        io = socketIO(server)
        io.on('connect', (socket) => {
            ws = socket
        })   
    },

    io,

    ws
}