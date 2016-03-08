

var Q = require('q');
var fs = require('fs');

function fs_readFile (file, encoding, callback) {
  var deferred = Q.defer();
  fs.readFile(file,'utf-8',function (err, data) {  // 异步读取 可以使用同步读取的命令
    if (err) deferred.reject(err) // rejects the promise with `er` as the reason
    else deferred.resolve(data) // fulfills the promise with `data` as the value
  })
  return deferred.promise.nodeify(callback) // the promise is returned
}

// Q.all([
// 	fs_readFile('file1.txt'), 
// 	fs_readFile('file2.txt') 
// ]).then(console.log, console.error);

Q.all([
	fs_readFile('file1.txt'), 
	fs_readFile('file2.txt'),
	// fs_readFile('file3.txt')  // This file is not exists,so it makes error 
]).then(function(fileData){
	console.info('Data =>',fileData);
}).catch(function(e){
	console.error('Error =>',e);
});