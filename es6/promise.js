//'use strict';

var fs = require('fs');
var file = '../tmp/test2.txt';
//创建promise
var promise = new Promise(function(resolve, reject) {
    // 进行一些异步或耗时操作
    fs.readFile(file,'utf-8',function(err,data){
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    })
});
//绑定处理程序
promise.then(function(result) {
    //promise成功的话会执行这里
    console.log(result); // "Stuff worked!"
}, function(err) {
    //promise失败会执行这里
    console.log(err); // Error: "It broke"
});


promise.then(function(rs){
    console.log(rs);
}).catch(function(err){
    console.error('Catch error: ',err); // Error: "It broke"
}).done();