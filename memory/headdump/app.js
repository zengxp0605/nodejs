//app.js
var app = require('express')();
var http = require('http').Server(app);
var heapdump = require('heapdump');
var moment = require('moment');
var fs = require('fs');

var leakobjs = [];

function LeakClass() {
    this.x = 1;
}

app.get('/', function (req, res) {
    console.log('get /');
    for (var i = 0; i < 1000; i++) {
        leakobjs.push(new LeakClass());
    }
    res.send('<h1>Hello world</h1>');
});

var logPath = __dirname + '/snapshotLogs/';
if (!fs.existsSync(logPath)) {
    console.log('文件夹不存在,创建..');
    fs.mkdirSync(logPath);
}

setInterval(function () {
    var _time = moment().format('YY-MM-DD_HH_mm_ss');
    var logFile = logPath + _time + '.heapsnapshot';

    console.log('创建内存快照文件: ' + logFile);
    // heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
    heapdump.writeSnapshot(logPath + moment().format('YY-MM-DD_HH_mm_ss') + '.heapsnapshot');
}, 10000);

http.listen(3000, function () {
    console.log('listening on port 3000');
});


// jmeter