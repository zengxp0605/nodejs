
const net = require('net');
const PORT = 8030;

const server = net.createServer(function (socket) {
    console.log('Server Connected');

    socket.on('data', function (data) {
        socket.write(data);
        return;
        socket.write('Hello client');
        try {
            data = JSON.parse(data.toString());
        } catch (error) {
            console.error(error);
        }
        console.log('服务端：收到客户端数据，内容为:', data, typeof data);
    });

    socket.on('close', function () {
        console.log('服务端：客户端连接断开');
    });
    socket.on('error', function (err) {
        console.log('服务端：error: ', err);
    });
});

server.listen(PORT, function () {
    console.log('Server started');
});