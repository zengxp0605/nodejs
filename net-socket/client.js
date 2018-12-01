const net = require('net');
const _ = require('lodash');

const PORT = 8030;
// const HOST = 'localhost';

const HOST = 'jasonzeng.top';

function newClient() {
    let timer, count = 0, arr = [], errCount = 0, total = 0, vaildCount = 0;
    // tcp客户端
    const client = new net.Socket();
    client.connect(PORT, HOST, function () {
        console.log('Connected');
        // client.write('Hello, server! Love, Client.');
        timer = setInterval(() => {
            count++;
            if (count >= 1000) {
                clearInterval(timer);
                timer = null;
                console.log('Done argv: ', total / vaildCount, JSON.stringify({ total, vaildCount, count, errCount }));
                return;
            }
            let time = Date.now();
            let data = JSON.stringify({ time });
            client.write(data);
        }, 20);
    });

    client.on('data', function (data) {
        // console.log('Received: ', typeof data, data + '');
        // client.destroy(); // kill client after server's response
        try {
            let newData = JSON.parse(data);
            // console.log(newData);
            let { time } = newData;
            let now = Date.now();
            let gap = now - time;
            total += gap;
            vaildCount++;
        } catch (error) {
            // console.error(error);
            errCount++;
        }
    });

    client.on('close', function () {
        console.log('Connection closed');
    });
}


// 测试
for (let i of new Array(100)) {
    newClient();
}
