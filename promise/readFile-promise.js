<<<<<<< HEAD

var Q = require('q');

var fs = require('fs');
=======
var Q = require('q'),
fs = require('fs');
>>>>>>> a787dfc8562dd24331a2681f32d471f0eb0c175b

var file = './tmp/test.txt';
console.log('原始方式:---------开始读取文件--------');
fs.readFile(file,'utf-8',function(err,data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
<<<<<<< HEAD
})
console.log('原始方式:--------读取结束--------');


=======
});
console.log('原始方式:--------读取结束--------');

>>>>>>> a787dfc8562dd24331a2681f32d471f0eb0c175b
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
<<<<<<< HEAD
fsReadFileDeferd(file).then(function(result){
	console.log(result);
}).catch(console.error);
console.log('Promise方式:---------读取结束--------');

        

            
=======

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
	var MyObj = {};
	MyObj.testFun = function(_arg){
		return [1,2,3,_arg];
	};

	// 其他的方式  
	Q.nfcall(fs.readFile,file,'utf-8').done(function(str){
		console.log('nfcall result: ',str);
	});
	//.done();

	Q.ninvoke(fs,'readFile',file,'utf-8').done(function(str){
		console.log('ninvoke result: ',str);
	});
	// 这里传参方式必须为数组
	Q.npost(fs,'readFile',[file,'utf-8']).done(function(str){
		console.log('npost result: ',str);
	});

	//  invoke, 这里不能替换为  ninvoke 方式
	Q.invoke(MyObj,'testFun','testArg').done(function(rs){
		console.log('invoke result: ',rs);
	});

	Q.fcall(MyObj.testFun,'testArg').then(function(rs){
		console.log('fcall result: ',rs);
	}).done();

});
>>>>>>> a787dfc8562dd24331a2681f32d471f0eb0c175b

