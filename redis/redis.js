
var redis = require('redis').createClient(6379,'127.0.0.1');

redis.info(function(err,response){
    //console.log(err,response);
});

// 普通命令set/ get
redis.set('aaa', 111111);
redis.get('aaa', function(err, reply){
	console.log(reply);
});

// 添加过期时间
redis.set('key', 'datas exprie 5 minute', 'EX', 60 * 5, function(err, rs){
    console.log('-----------------------------');
    console.log(err, rs);
    console.log('-----------------------------');
});

// 发布频道
redis.publish('first', '【first】: news 1');
redis.publish('first', '【first】: news 2');
redis.publish('second','【second】： test ...');

// 3秒后自动退出发布
setTimeout(function(){
    console.log('quit publish');
    redis.quit();
}, 3000);




