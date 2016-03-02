
var Q = require('q');

var fs = require('fs');

var file = './tmp/test.txt';
console.log('原始方式:---------开始读取文件--------');
fs.readFile(file,'utf-8',function(err,data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
})
console.log('原始方式:--------读取结束--------');


console.log('Promise方式:---------开始读取文件--------');

var fsReadFileDeferd = function(file,encoding){
	var encoding = encoding ? encoding : 'utf-8';
	var defer = Q.defer();
	fs.readFile(file,encoding,function(err,result){
		if(err){
			defer.reject(err);
		}else{
			defer.resolve(result);
		}
	});
	return defer.promise;
}
fsReadFileDeferd(file).then(function(result){
	console.log(result);
}).catch(console.error);
console.log('Promise方式:---------读取结束--------');

