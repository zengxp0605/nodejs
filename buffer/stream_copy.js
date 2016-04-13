// 通过流的方式复制文件 读-> 写
var fs = require('fs');

var readStream = fs.createReadStream('origin.pdf');
var writeStream = fs.createWriteStream('copy.pdf');

readStream.on('data', function(chunk){
    // 如果为false ,说明数据还在缓存区, 未写入, 此时暂停读取
    if(writeStream.write(chunk) === false){ 
        console.log('still cached');
        readStream.pause();
    }
});

readStream.on('end', function(){
    // 读取完毕关闭数据流
    writeStream.end();
});

// 写入完成的事件
writeStream.on('drain', function(){
    console.log('data drain');
    // 写入完成, 继续读取
    readStream.resume();
});


/***************通过pipe 的方式复制 *******************/
var fs = require('fs');

fs.createReadStream('origin.pdf').pipe( fs.createWriteStream('copy_pipe.pdf'));

