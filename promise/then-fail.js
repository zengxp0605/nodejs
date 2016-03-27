var Q = require('q');
var _ = require('underscore');


function setLock(){
    var isLock = _.random(1, 1);
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

}, function(err1){
    console.log('err1:', err1);
})
.then(function(){
    console.log('test1');
})
.then(function(){
    console.log('test2');
})
.fail(console.error)
.done();

//return;


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

