'use strict';
const Event = require('events');

const event = new Event();
const eventName = 'counter';

const myCounter = {
  counter: 0,
};

event.on(eventName, (msg) => console.log('Event:', msg));

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    // event.emit(eventName, { newValue, key: propertyKey });
    target[propertyKey] = newValue;
    return true;
  },

  get: (object, prop) => {
    event.emit(eventName, { op: 'get', object, prop });
    return object[prop];
  },
});

// para sempre
setInterval(function () {
  proxy.counter += 1;

  if (proxy.counter >= 10) {
    clearInterval(this);
  }
}, 1000);


// futuro
setTimeout(() => {
  proxy.counter = 3;
}, 5000);

// fura a fila e adiciona
process.nextTick(() => {
  proxy.counter = 3;
});

// imediato
setImmediate(() => {
  console.log('setImmediate:', proxy.counter);
});
