
const axon = require('axon');
const sock = axon.socket('pull');
sock.connect(3000);

let i = 0;
sock.on('message', function(str){
  let now = Date.now();
  let [data, time] = (str+'').split('|')
  console.log(i++, now - Number(time));
});
