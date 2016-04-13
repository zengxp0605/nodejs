var fs = require('fs');

/***************简单的方式读取/写入文件******************/
var source = fs.readFileSync('logo.png');
fs.writeFileSync('logo_copy_stream.png', source);

/***************通过'流'读取文件**************************/

var readStream = fs.createReadStream('buffer.js');
var count = 0;

readStream
    .on('data', function(chunk){
        console.log('data emits');
        console.log('isBuffer: ' , Buffer.isBuffer(chunk));
        // console.log('-------------file start-----------');
        // console.log(chunk.toString('utf8'));
        // console.log('-------------file end-------------');
        count ++;
        // 暂停流
        readStream.pause();
        console.log('stream pause');
        // 模拟异步事件
        setTimeout(function(){
            console.log('stream pause end');
            // 重新启动流
            readStream.resume();
        }, 500);
    })
    .on('readable', function(){
        console.log('data readable');
    })
    .on('end', function(){
        console.log('data end');
        // 如果是大文件, 这里可以看到是多次读取的
        console.log('读取次数为: ' + count);
    })
    .on('close', function(){
        console.log('data close');
    })
    .on('error', function(err){
        // 如果 fs.createReadStream 读取的文件不存在,则会在这里抛出异常
        console.log('data error: ', err);
    });


