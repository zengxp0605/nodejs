
var os = require('os');

var format = function(bytes){
    return (bytes / 1024 / 1024).toFixed(2) + 'MB';
};    

console.log('start: totalmem ' + format(os.totalmem()), ' freemem ' + format(os.freemem()));

var showMem = function () {
    var mem = process.memoryUsage();

    console.log('Process: heapTotal ' + format(mem.heapTotal) + ' heapUsed ' 
        + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('---------------------------------------------');
};


var useMem = function(){
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    //var size = 20 * 1024 * 1024 ;
    //var arr = new Buffer(size);
    for(var k in arr){
        arr[k] = 0;
    }
    return arr;
};

var total = [];

for(var j = 0; j < 12; j++){ 
    showMem();
    console.log(j);
    total.push( useMem());
}

showMem();

console.log('stop: totalmem ' + format(os.totalmem()), ' freemem ' + format(os.freemem()));

