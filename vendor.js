'use strict';

// npm install @faker-js/faker

const socketioClient = require('socket.io-client');
const homesocket = socketioClient.connect('http://localhost:3000');
const caps = socketioClient.connect('http://localhost:3000/caps');

let storeName = "circuit city";
let orderID = "12345"
let customer = "james washington"
let address = "papua new guinea"

let time = new Date();

const pickupOrder1 = {
  "store": storeName,
  "orderID": orderID,
  "customer": customer,
  "address": address,
};

const EVENT = {
  "event": "eventType",
  "time": time,
  "payload": pickupOrder1
};

let driverPayload = {};

// console.log("EVENT ")
// console.log(EVENT);

console.log('vendor.js is active'); // for nodemon

// Each Vendor will only emit and listen for specific events based on their Vendor ID. This will be managed by rooms within Socket.io.


// Confirm connect
homesocket.on('welcome', payload => {
  console.log(payload);
});

// As a vendor, I want to alert the system when I have a package to be picked up.

// pickup simulation listen and emit
caps.on('pickupconnection', () => {
  console.log('Vendor Log: Caps pickup simulation activated.')
  caps.emit('capspickup', pickupOrder1)
});

// Let server know 
caps.on('vendorshipmentinfo', (pickupOrder1) => {
  console.log('Vendor Log: shipment info sent to server');
  caps.emit('12345', pickupOrder1);
  driverPayload = pickupOrder1;
});

  // As a vendor, I want to be notified when my package has been delivered.
  caps.on('capsdelivery', (payload) => {
    console.log('Delivery with orderID: ' + payload.orderID +  ' achieved via CAPS.');
    
    handleDelivery();
  });

  function handleDelivery(driverPayload) {
    console.log('Thank you, ' + driverPayload);
  }




