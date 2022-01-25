'use strict';

const eventPool = require("./eventPool");

// For these, the client.js will be the app that runs constantly, monitoring and handling events. They’ll use the queue.js to subscribe to the hub server using a common library

// Client applications will “subscribe” to the hub server’s queue for a given event. Subscribing means that the client intends for the hub server to save all messages until the client confirms receipt. Subscribing through the queue library should look like this:

// Your implementation should use a store name as a parameter.
let storeName = "circuit city";
let order_id = "12345"
let customer = "james washington"
let address = "papua new guinea"

const payload = {
  "store": storeName,
  "orderID": order_id,
  "customer": customer,
  "address": address,
};

console.log(payload);

// simulates a pickup event
function simulatePickup() {
setInterval(() => {  
  // Log a message to the console: DRIVER: picked up <ORDER_ID>.
  console.log(payload.customer + ": picked up order ID:" + payload.order_id);
}, 6000);
  // emits pickup to the global event pool.
  eventPool.emit('delivered', handleDelivery)
}


  function handleDelivery(payload) {
    console.log('Thank you, ' + payload.store);
  }

 
  module.exports = {
    simulatePickup,
    handleDelivery,
};


 