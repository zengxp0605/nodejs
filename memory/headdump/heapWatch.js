
var heapdump = require('heapdump');
var moment = require('moment');
var fs = require('fs');

module.export = function(){

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
}
