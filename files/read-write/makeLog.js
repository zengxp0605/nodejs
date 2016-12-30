var winston = require('winston');
var moment = require('moment');

var logger = new winston.Logger({
    level: 'info',
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'demo.log'
        })
    ]
});


// 定时任务写入日志

setInterval(function () {
    var _time = moment().format('YYYY-MM-DD HH:mm:ss.ms');
    logger.info(_time);
}, 1000);