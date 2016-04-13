/**
 * 定制 可写流,可读流 和转换流
 */

var stream = require('stream');
var util = require('util');

// 1. 实现继承 stream.Readable
function ReadStream(){
    stream.Readable.call(this);
}
util.inherits(ReadStream, stream.Readable);

// 重写 _read 方法
ReadStream.prototype._read = function(){
    this.push('I ');
    this.push('Love ');
    this.push('Mary \n');
    this.push(null); // 这句不能省略
};

// 2. 实现继承 stream.Writable
function WriteStream(){
    stream.Writable.call(this);
    this._cached = new Buffer('');
}
util.inherits(WriteStream, stream.Writable);

// 重写write 方法
WriteStream.prototype._write = function(chunk, encode, cb){
    console.log(chunk.toString());
    cb();
};

// 3. 实现继承 stream.Transform
function TransformStream(){
    stream.Transform.call(this);
    //this._cached = new Buffer('');
}
util.inherits(TransformStream, stream.Transform);


// 重写_transform 方法
TransformStream.prototype._transform = function(chunk, encode, cb){
    this.push(chunk);
    cb();
};

// 重写_flush 方法
TransformStream.prototype._flush = function(cb){
    this.push('Oh Yeah!');
    cb();
};

var rs = new ReadStream();
var ws = new WriteStream(); 
var ts = new TransformStream();

// 中间是转换流, 不存储数据
rs.pipe(ts).pipe(ws);

