var Q = require('q');
var _ = require('underscore');


function setLock(){
    var isLock = _.random(0, 1);
    console.log(isLock); 
    var defer = Q.defer();
    if(isLock === 1){
        //throw new Error('It is locked.');
        defer.resolve(true);
    } else {
        defer.resolve(false);
    }

    return defer.promise;
};

setLock().then(function(rs){
    console.log('rs:', rs);
    if(rs){
        throw new Error('已锁!');
    }
}, function(err1){
    console.log('err1:', err1);
})
.then(function(){
    console.log('test1');
})
.then(function(){
    console.log('test2');
})
// 下面的catch 和fail 哪个写在前面,error时会执行哪个, done 则都会执行
.catch(function(){
    console.log('catch....');
})
.fail(function(){
    console.log('fail....');
})
.done(function(){
    console.log('done....');
});

return;


setLock().then(function(isLock){
    if(isLock){
        throw new Error('USER_LOCKED');
        return;
    }
    return {test:'something'};
})
.then(function(data){
    console.log('data',data);
    return 'success';
})
.then(function(rs){
    console.log('rs:', rs); 
})
.fail(function(err){
    console.log('{Fail.err}' + err);
})
.done();

