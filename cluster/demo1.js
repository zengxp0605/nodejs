
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

var flag = 0;  // 每次输出都是 1, 进程间数据不共享

if (cluster.isMaster) {
  console.log('cpus:',numCPUs);
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  cluster.on('listening', function(worker, address) {  
    console.log("A worker with #"+worker.id+" is now connected to " +
     address.address +
    ":" + address.port);  
  });
    flag++; 
    console.log('flag VALUE in MainProcess: %d ' , flag);
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

   flag++; 
    console.log('flag VALUE in ChildProcess %d: %d ',cluster.worker.id, flag);
}