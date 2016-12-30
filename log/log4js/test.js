var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: 'log.log',
        pattern: "_yyyy-MM-dd",
        maxLogSize: 1000000,
        backups: 3,
        category: 'dateFileLog'
    }],
    replaceConsole: true
});

var logger = log4js.getLogger('dateFileLog');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

console.log(111111111111);