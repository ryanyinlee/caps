'use strict';

const uuid = require('uuid').v4;
const socketio = require('socket.io');

const caps = server.of('/caps');

//npm install uuid 
// generate unique ID strings

const queue = {
    payload: {},
    addPayload: function() {
        let id = uuid();
        this.payload[id] = payload;
        return {
            id,
            payload: this.payload,
        }
    },
    removePayload: function(id) {
        delete queue.payload[id];
    },
};

caps.on('connection', (socket) =>{
    // socket can add a payload to the queue
    socket.on('newPayload', payload => {
        queue.addPayload(payload);
        payload.emit('Payload stored in queue.', payload);
    });

    //give all payloads to the socket that asked
    socket.on('getPayloads', () => {
        Object.keys(queue.payload).forEach(id => {
            socket.emit('sending payload', { id, payload: queue.payload[id] });
        })
        console.log(queue.payload);
    });

    // remove payload from the queue
    socket.on('done', payload => {
        queue.removeChore(payload.payloadId);
        console.log(queue);
        caps.emit('completed', {payloadId: payload.payloadId});
    });

});


// class QueueClient {
//     constructor(namespace) {
//         this.socket = socketio.connect(`${HOST}${namespace}`);
//     }

//     subscribe(event, cb) {
//         this.socket.on(event, cb);
//         this.socket.join(event);
//     };

//     publish(event,payload) {
//         this.socket.on(event, console.log);
//         this.socket.emit(event, payload);
//     };
// };