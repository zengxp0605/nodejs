
var winston = require('winston');

var logger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'test.log' })
    ]
});


// 
// Any logger instance 
// 
logger.log('silly', "127.0.0.1 - 1111");
logger.log('debug', "127.0.0.1 - 2222");
logger.log('verbose', "127.0.0.1 - 333");

logger.log('info', "127.0.0.1 - 444");
logger.log('warn', "127.0.0.1 - 5555");
logger.log('error', "127.0.0.1 - 6666");
logger.info("127.0.0.1 - there's 7777");
logger.warn("127.0.0.1 - there's 8888");
logger.error("127.0.0.1 - there's 9999");

// 
// Default logger 
// 
winston.log('info', "127.0.0.1 - 00000");
winston.info("127.0.0.1 - there's no place like home");

// 写入文件
// function writeFile(file, content){ 
//     var fs = require('fs'); 
      
//     // appendFile，如果文件不存在，会自动创建新文件  
//     // 如果用writeFile，那么会删除旧文件，直接写新文件  
//     fs.appendFile(file, "\r\n" + content, function(err){  
//         if(err)  
//             console.info("fail " + err);  
//         else  
//             console.info("写入文件ok");  
//     });  
// }  

// console.log = function(msg){
//   process.stdout.write('Log data: ' + msg);
//   writeFile('d:/tmp/test.log', msg);
// };

// console.log('how about 中文');

// console.info(process.stdout.on);

// process.stdout.on('data', function(){
//     process.stdout.write('end');
// });
