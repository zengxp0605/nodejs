
var memwatch = require('memwatch');

memwatch.on('leak', function (info) {
    console.log('leak:', info);
});


memwatch.on('stats', function (stats) {
    console.log('stats:', info);
});


var http = require('http');

var leakArray = [];
var leak = function(){
    leakArray.push('leak-' + Math.random());
};

http.createServer(function(req, res){
    leak();
    res.writeHead(200, {'Content-type' : 'text/plain'});
    res.end('Hello world\n');
}).listen(5001);

