'use strict';

const socketioClient = require('socket.io-client');
const homesocket = socketioClient.connect('http://localhost:3000');
const caps = socketioClient.connect('http://localhost:3000/caps');


// Confirm connect
homesocket.on('welcome', payload => {
    console.log(payload);
  });

// Each Driver will “pick up” a package when the vendor notifies the Server that an “order” is ready and simulate “in-transit” and “delivered” events.

// As a driver, I want to be notified when there is a package to be delivered.

caps.on('capspickup', (payload) => {
console.log('Driver Log: Pickup achieved from ' + payload.store);
console.log('Driver Log: with OrderID ' + payload.orderID);
//console.log(payload);

// As a driver, I want to alert the system when I have picked up a package and it is in transit.
caps.emit('in-transit', payload);
console.log('Driver Log: Delivery in-transit.')

// As a driver, I want to alert the system when a package has been delivered.
caps.emit('delivered', "Driver Log: Delivery complete.");
console.log('Driver Log: Delivered.')
});


caps.emit('getPayloads');
caps.on('getPayloads', payload => {
  console.log(payload);
});
