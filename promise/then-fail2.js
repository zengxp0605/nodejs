'use strict';

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

function BreakSignal(err){
    console.log('--BreakSignal--',err);
    return 'locked error';
};


setLock()
    .then(function(isLock)  {
        if (isLock) {
            // 抛出中断信号.
            //throw new BreakSignal();
            throw new Error('It locked');
        }
        return true;
    })
    .then(function() {
        console.log('test1');
    })
    .then(function() {
        // 需要跳过的部分.
        console.log('test2');
    })
    // 接住中断信号.
    .catch(BreakSignal, function(err) { 
        console.log('catch',err);
    })
    .catch(function(err) { 
        console.log('catch',err);
    })
    .done();