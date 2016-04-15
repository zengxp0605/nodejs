
var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

var readStream = new Readable();
var writeStream = new Writable();

readStream.push('I ');
readStream.push('Love ');
readStream.push('Mary \n');
readStream.push(null); // 这句不能省略

// 重写write 方法( 为什么必须重写这个方法???)
writeStream._write = function(chunk, encode, cb){
    console.log(chunk.toString());
    cb();
};

readStream.pipe(writeStream);

/*********写入文件*********/
var fs = require('fs');
var fileWriteStream = fs.createWriteStream('test.txt');

readStream.pipe(fileWriteStream);