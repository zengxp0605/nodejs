var Q = require('q'),
fs = require('fs');

var file = './tmp/test.txt';
console.log('原始方式:---------开始读取文件--------');
fs.readFile(file,'utf-8',function(err,data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
});
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
	return result;
}).then(function(rs){
	console.log('------------',rs);
	return {
		a:'aaaa',
		b:'bbbb'
	}
}).then(function(testRes){
	console.log('------------testRes: ' , testRes);
	return Q.all([
			testRes,
			//fsReadFileDeferd('ttt'), // Error: ENOENT: no such file or directory 
			fsReadFileDeferd(file),
			fsReadFileDeferd(file),
		].concat([111,222,333]));
}).then(function(datas){
	console.log('--------datas: ',datas);
}).then(function(_empty){
	console.log('nothing ... ,but this also output!',_empty);
}).catch(function(err){
	console.error('Catch err: ',err);
}).done();

console.log('Promise方式:---------读取结束--------');

Q.delay(1000).then(function(){
	console.log('');
	console.log('=============延时1s delay 的分割线================');
	var testFun = function(_arg){
		return [1,2,3,_arg];
	};

	// 其他的方式  
	Q.nfcall(fs.readFile,file,'utf-8').then(function(str){
		console.log('nfcall result: ',str);
	})
	.done();

	Q.ninvoke(fs,'readFile',file,'utf-8').done(function(str){
		console.log('ninvoke result: ',str);
	});

	//  invoke 无法运行!!!!???
	// Q.invoke(testFun,['aa','bb']).done(function(rs){
	// 	console.log('invoke result: ',rs);
	// });

	Q.fcall(testFun,['a','b']).then(function(rs){
		console.log('fcall result: ',rs);
	}).done();

});

