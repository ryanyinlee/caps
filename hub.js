"use strict";

const socketio = require("socket.io");
const PORT = process.env.PORT || 3000;
const server = socketio(PORT); // default localhost:3000 connections

// namespace
const caps = server.of('/caps'); //'http://localhost:3000/caps'

console.log('hub.js is active'); // for nodemon

let driverPayload = {};

server.on("connection", (socket) => {

//   console.log("Hub Log: User has connected.");
//   console.log("Hub Log: Their socket ID is: " + socket.id);

  // generic greeting
  socket.emit('welcome',  'Hub Emit: Welcome, your Hub connection is active.',);
}); // end of server.on


// caps namespace should listen and emit with pickup/in-transit/delivered
caps.on('connection', (socket)=> {
    console.log('Hub Log: Caps connection active with socket: ' + socket.id);

// activate pickup on vendor
socket.emit('pickupconnection');


socket.on('capspickup', (payload) => {
    //console.log('Hub Log: (capspickup) Namespace hit.');
    driverPayload = payload;
    console.log(payload);
    console.log('Hub Log: (capspickup) Payload received from ' + payload.store);    
});

// in transit emit to driver
socket.emit('capspickup',  driverPayload);

// in transit listen from driver
socket.on('in-transit', (payload) => {
    //console.log('Hub Log: (in-transit) Namespace hit.')
    console.log("Hub Log: Driver in-transit with " + payload.orderID);    
});

// delivered listen from driver
socket.on('delivered', (payload) => {
    //console.log('Hub Log: (delivered) Namespace hit.')
    console.log(payload);    
});


// pickup listen from vendor ID
const vendorID = '12345';
socket.join(vendorID);
// delivered emit to vendor
caps.to(vendorID).emit('capsdelivery', driverPayload);

}); // end of caps.on


function logger(event, payload) {
  let timeStamp = new Date();
  console.log("Event: " + event.toUpperCase());
  console.log("TimeStamp: " + timeStamp);
  console.log(payload.orderId);
}

// from class 12 demos
