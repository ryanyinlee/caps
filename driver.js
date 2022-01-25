'use strict';

const eventPool = require("./eventPool");

eventPool.on('pickup', handleInTransit) // listens for a pickup event

function handleInTransit(payload) {
    setInterval(() => {
        // Log a message to the console: DRIVER: picked up <ORDER_ID>.
        console.log(payload.driver + ": picked up order ID:" + payload.order_id);
        // Emit an ‘in-transit’ event to the Global Event Pool with the order payload.
        eventPool.emit('in-transit', { payload });
        
      }, 2000, handleDelivered);
}

function handleDelivered(payload) {
setInterval(() => {
    // Emit an ‘delivered’ event to the Global Event Pool with the order payload.
    eventPool.emit('delivered', { payload });
    // Log a confirmation message to the console: DRIVER: delivered <ORDER_ID>
    console.log(payload.driver + ": delivered order ID: " + payload.order_id);
  }, 2000);

}

module.exports = {
    handleInTransit,
    handleDelivered
};