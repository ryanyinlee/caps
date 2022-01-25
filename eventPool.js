'use strict';

const Events = require('events');

const eventPool = new Events(); // this is a singleton for our event pool

module.exports = eventPool;