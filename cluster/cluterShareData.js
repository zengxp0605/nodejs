var cluster = require('cluster'); 
var http = require('http'); 
 
/**
 *  多个进程共享数据, 负载均衡测试,windows 不成功, linux 下待测试
 */
if (cluster.isMaster) {
  console.log('[master] ' + "start master..."); 
  var numCPUs = require('os').cpus().length; 
  var data = 0; 
  // 启动多个进程. 
  for (var i = 0; i < numCPUs; i++) { 
   //增加一个进程 
    var worker_process = cluster.fork(); 
    //侦听子进程的message事件 
    worker_process.on('message', function(msg) { 
      if (msg.cmd && msg.cmd == 'notifyRequest') { 
        data++; 
        console.log('DATA VALUE : %d ', data);
      } 
    }); 
  }

    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

} else { 
    process.send({ cmd: 'notifyRequest' }); 

    if(cluster.isWorker){
        console.log('[worker] ' + "start worker ..." + cluster.worker.id);
        http.createServer(function (req, res) {
            console.log('worker'+cluster.worker.id);
            res.end('worker'+cluster.worker.id+',PID:'+process.pid);
        }).listen(8000);
    }
} 


