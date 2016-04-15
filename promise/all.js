var Q = require('q');

var testFun1 = function(v){
    var deferred = Q.defer();
    Q.delay(3000).then(function(){
        // 这里如果抛出错误, 会由后面的fail捕获
        //throw new Error('someErr!');
        //deferred.reject('Test Error1');
        deferred.resolve(v + 1);
    }).fail(function(err){
        console.log('{testFun1},error: ' + err);
    }).done();
    return deferred.promise;
};

var testFun2 = function(v){
    var deferred = Q.defer();
    Q.delay(2000).then(function(){
        //deferred.reject('Test Error2');
        deferred.resolve(v * 2);
    }).done();
    return deferred.promise;
};

var errFun = function(v){
    var deferred = Q.defer();
    Q.delay(1000).then(function(){
        deferred.reject('Test Error3');
    }).done();
    return deferred.promise;
};

// Q.all([
//     testFun1(10),
//     testFun2(20),
//     //errFun(30),
// ])
// .spread(function (x, y) {
//     console.log(x, y);
//     return Q.delay('test msg', 5000);
// }).then(function(rs){
// 	console.log('delay 5s message: '+ rs);
// })
// .catch(console.error)
// .done(function(){
//     console.log('done....');
//     clearInterval(timer);  // 执行完毕清除倒计时
// });

// // 计时器,用于显示效果
// var count = 0;
// var timer = setInterval(function(){
//     console.log(++ count);
// }, 1000);

// return;

/**************/
// any 的作用是 promises 数组中,哪个方法先执行完就返回该方法的结果, 只有所有的都是rejected 才会rejected
// [Error: Can't get fulfillment value from any promise, all promises were rejected.]
// 如果有提早抛出错误, 则进入catch 代码段
Q.any([
    testFun1(10),
    testFun2(20),
    errFun(30),
])
.then(function (x) {
    console.log(x);
}).catch(console.info)
.done();

