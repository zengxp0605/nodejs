
//var redis = require('redis').createClient(6379,'127.0.0.1');

var redis = require('ioredis')(6379,'127.0.0.1',{
      retryStrategy: function (times) { // 自动重连
        console.log('Redis retry times: ' + times);
        var delay = Math.min(times * 2, 2000);
        return delay;
    }
});

redis.set('aaa',111111);

redis.get('aaa',function(err,reply){
	console.log(reply);
});

redis.publish('first','first channel 1----');
redis.publish('second','second channel 2#####');


redis.info(function(err,response){
	//console.log(err,response);
});