var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.use('/',express.static(__dirname + '/www')); //指定静态资源目录
server.listen(3001);
console.log('server started. listening on port 3001' );

/****** test of namespace
Server.js
    var m_io = io.of('/my-namespace');
    m_io.on('connection',function(socket){ });
  
Client.js
    var socket = io.connect('/my-namespace');
******/
// io.sockets.on('connection',function(socket){
io.on('connection',function(socket){
    console.log('io connection [ok]');
    socket.on('sendMsg',function(msg,color){
        console.log('sendMsg from: ',socket.username,'| message: ',msg);
         //通知除自己以外的所有人 TODO：如何用了room 后如何实现
        //socket.broadcast.emit('newMsg',socket.username,msg,color);
        socket.to(socket.roomId).emit('newMsg',socket.username,msg,color);
        //io.in(socket.roomId).emit('newMsg',socket.username,msg,color);
    });
});
 