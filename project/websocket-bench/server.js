var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var test2 = {
    test1: 'data1',
    test2: 'data2'
};

function log() {
    var _time = (new Date()).getTime() + ' ';
    var _arr = [];
    for (var k in arguments) {
        _arr.push(arguments[k]);
    }
    var _args = [_time].concat(_arr);
    console.log.apply(console, _args);
}

server.listen(5003, function() {
    log('server started. listening on port 5003');
});

io.on('connection', function(socket) {
    log('io connection [ok]');
    socket.on('router', function(data) {
        log('Message from client: ', data);
        //通知除自己以外的所有人 TODO：如何用了room 后如何实现
        //socket.broadcast.emit('newMsg',socket.username,msg,color);
        io.sockets.emit('router', {
            cmd: 'test::test',
            req: {
                test: 'data',
            }
        });
        //io.in(socket.roomId).emit('newMsg',socket.username,msg,color);
    });

});