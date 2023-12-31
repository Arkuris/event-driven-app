'use strict';

const io = require('socket.io-client');

describe('Driver Client Application', () => {
  let socket;

  beforeAll((done) => {
    socket = io('http://localhost:3002/caps');
    socket.on('connect', done);
  }, 10000); // Setting timeout to 10 seconds

  afterAll(() => {
    socket.disconnect();
  });

  it('should receive pickup event and emit in-transit', (done) => {
    const testPayload = {
      store: '1-800-Flowers',
      orderId: 'testOrder123',
      customer: 'John Doe',
      address: '123 Main St',
    };

    // Emulate the vendor emitting a pickup event
    socket.emit('pickup', testPayload);

    // The driver should respond to the pickup with in-transit
    socket.on('in-transit', (payload) => {
      expect(payload).toEqual(testPayload);
      done();
    }); 
  }, 10000); // Timeout 10 seconds
});
