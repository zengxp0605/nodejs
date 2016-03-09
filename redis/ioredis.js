var Q = require('q');

var ioredis = require('ioredis')('redis://127.0.0.1:6379/1',{
    retryStrategy: function (times) {
    var delay = Math.min(times * 2, 2000);
    console.log('Try connecting redis times :',times);
    return delay;
  }
});


ioredis.on('connect',function(){
    console.log('Load redis [ok]');
    ioredis.hmset('key', { k1: 'v1', k2: 'v2' }); 


    Q.delay(1000).done(function(){
        console.log('delay 1000ms...');
        Q.ninvoke(ioredis,'hgetall','key').then(function(data){
            console.log(data);
        }).done();
    });

});



