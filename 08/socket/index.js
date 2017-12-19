'use strict'

const socketIO = require('socket.io')
const Hertzy = require('hertzy')


module.exports = function socket(httpServer) {
    
    const io = socketIO(httpServer)
    const fqp = Hertzy.tune('posts')

    io.on('connection', function (socket) {
        fqp.on('post:update', function (data) {
            console.log('POST UPDATE WITH THE FOLLOWING DATA:')
            console.log(data)
            socket.emit('post:update', data)
        })
        fqp.on('post:create', function (data) {
            console.log('POST CREATE WITH THE FOLLOWING DATA:')
            console.log(data)
            socket.emit('post:create', data)
        })   
    })

}