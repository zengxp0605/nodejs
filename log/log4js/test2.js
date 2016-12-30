var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'datefile',
        // type: 'console',
        filename: 'test2.log',
        layout: {
            type: 'basic'
        },
        pattern: '.yyyy-MM-dd.hh.mm',
        alwaysIncludePattern: true,
        category: 'test2'
    }, ]
});

// log4js.addAppender(log4js.appenderMakers['datefile']({
//     filename: "test2.log",
//     layout: {
//         type: 'basic'
//     },
//     pattern: '.yyyy-MM-dd.hh.mm',
//     alwaysIncludePattern: true,
// }), 'test2');


var logger = log4js.getLogger('test2');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

console.log(22222222222);

var count = 0;
setInterval(function () {
    console.log(count++);
    logger.info(count);
}, 1000)