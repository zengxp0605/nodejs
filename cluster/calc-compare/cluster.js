var cluster = require('cluster');
var numCPUs = 5;
function fibo(n) {
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}
var total = 5;
console.time('5 cluster');
if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        if (!--total) {
            console.timeEnd('5 cluster');
            process.exit(0);
        }
    });
} else {
    console.log(fibo(40));
    process.exit(0);
}