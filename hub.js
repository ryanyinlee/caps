'use strict';

const eventPool = require('./eventPool.js'); // eventEmitter https://nodejs.org/api/events.html#events_class_eventemitter
const { simulatePickup, handleDelivery } = require('./vendor.js');
const { handleInTransit, handleDelivered} = require('./driver.js');


// Implement a Module for Managing Vendor Events.
// Your implementation should use a store name as a parameter.
// When run, the vendor module simulates a pickup event for the given store name to the Global Event Pool:
// emits pickup to the global event pool.
// emits a vendor order payload:

eventPool.on('pickup', handleInTransit);


// eventPool.on('in-transit', handleInTransit, logger);

eventPool.on('delivered', handleDelivered);

function logger (event, payload) {
    let timeStamp = new Date();
    console.log('Event', {event, timestamp, payload});
}
// from metty82

simulatePickup();