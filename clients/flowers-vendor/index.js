'use strict';

const socket = require('socket.io-client')('http://localhost:3002/caps');
const handler = require('./handler.js');

// Connect to the server and join the vendor room
socket.on('connect', () => {
  socket.emit('join', '1-800-Flowers');

  // Emit pickup event regularly to simulate new orders
  setInterval(() => {
    console.log('1-800-Flowers: Emitting a pickup event');
    handler.pickup('1-800-Flowers');
  }, 10000); // 10 SECOND INTERVALS
});

// Listening for the 'delivered' event from the server
socket.on('delivered', handler.thank);