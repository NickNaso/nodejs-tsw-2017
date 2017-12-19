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
            // Read socket.io documentation https://socket.io/docs/server-api/#socket-emit-eventname-args-ack 
            // Emit the 'post:update' event with data -> data
        })
        fqp.on('post:create', function (data) {
            console.log('POST CREATE WITH THE FOLLOWING DATA:')
            console.log(data)
            // Read socket.io documentation https://socket.io/docs/server-api/#socket-emit-eventname-args-ack 
            // Emit the 'post:create' event with data -> data
        })   
    })

}