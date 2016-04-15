// 订阅频道
//  subscribe first second

var client = require('redis').createClient(6379,'127.0.0.1');
var msg_count = 0;

 
client.on("subscribe", function (channel, count) {
    console.log('client: 订阅了频道-' , channel, ' |当前频道数量', count);
});


client.on('message', function (channel, message) {
    console.log("Sub channel " + channel + ": " + message);
    msg_count ++;
    if (msg_count === 3) {
        console.log('收到3条消息, 自动退出订阅!');
        client.unsubscribe();
        client.quit();
    }
});

client.subscribe('first', 'second');


 


