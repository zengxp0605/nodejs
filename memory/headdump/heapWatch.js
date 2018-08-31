
var heapdump = require('heapdump');
var moment = require('moment');
var fs = require('fs');

module.export = function(){

	var logPath = __dirname + '/snapshotLogs/';
	if (!fs.existsSync(logPath)) {
		console.log('�ļ��в�����,����..');
		fs.mkdirSync(logPath);
	}

	setInterval(function () {
		var _time = moment().format('YY-MM-DD_HH_mm_ss');
		var logFile = logPath + _time + '.heapsnapshot';

		console.log('�����ڴ�����ļ�: ' + logFile);
		// heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
		heapdump.writeSnapshot(logPath + moment().format('YY-MM-DD_HH_mm_ss') + '.heapsnapshot');
	}, 10000);
}
