
const axon = require('axon');
const sock = axon.socket('push');
let data = Array(1024 * 1024).fill('0').join('');
sock.bind(3000);
console.log('push server started');

setInterval(() => {
  let i = 100;
  while(i--) sock.send(`${data}|${Date.now()}`);
}, 1000);
