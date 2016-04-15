var Q = require('q');
var _ = require('underscore');



/**
 * 返回是否已锁, true: 已锁, false: 未锁
 */
function setLock(){
    var isLock = _.random(0, 1);  // 随机值模拟锁
    console.log('isLock: ', isLock);
    var defer = Q.defer();
    if(isLock === 1){
        //throw new Error('It is locked.');
        defer.resolve(true); // 已锁
    } else {
        defer.resolve(false);
    }

    return defer.promise;
};

setLock().then(function(isLock){
    if(isLock){
        throw new Error('已锁!');
    }
})
.then(function(){
    console.log('test1');
}, function(err1){
    // 这个then 前面跑出的错误会在这里处理掉, 然后继续执行下面的then
    console.log('err1:', err1);
})
.then(function(){
    console.log('test2');
})
.then(function(){
    console.log('test3');
    // 这个错误会被catch, 而后面test4 不会执行
    throw new Error('test3-ERR');  
})
.then(function(){
    console.log('test4');
})
// 下面的catch 和fail 哪个写在前面,error时会执行哪个, done 则都会执行
.catch(function(err){
    console.log('catch: ', err);
})
.fail(function(err){
    console.log('fail: ', err);
})
.done(function(){
    console.log('done....');
});



