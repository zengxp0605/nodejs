var Q = require('q');

var redis = require('ioredis')('redis://127.0.0.1:6379/1',{
    retryStrategy: function (times) {
    var delay = Math.min(times * 2, 2000);
    console.log('Try connecting redis times :',times);
    return delay;
  }
});

var line = function(flag){
    console.log('----------------------' + (flag ? flag : '分割线') + '-----------------');
}

redis.on('connect',function(){
    console.log('Load redis [ok]');

    //monitor: 监听所有的命令
    // redis.monitor(function (err, monitor) {
    //     monitor.on('monitor', function (time, args) {
    //         console.log(time, args);
    //     });
    // });

    redis.mset({ key1: 'v1', key2: 'v2' });
    redis.hmset('hash:test', { k1: 'v1', k2: 'v2' }); 

    redis.set('expires:test', 100, 'EX', 3000); // 同时设置失效时间

    Q.delay(500).done(function(){
        console.log('Delay 500ms...');
        Q.ninvoke(redis,'hgetall','hash:test').then(function(data){
            console.log('hgetall: ', data);
        }).done();
    });

/**************************************************************
 *  Pipeline: 高效执行多命令
 *  redis.multi() 调用事务时,默认是使用 pipeline 模式的, ==> redis.multi().set('foo').set('foo', 'new value').exec(function (err, results) {});
 *  可以通过 redis.multi({ pipeline: false }) 关闭pipeline 模式
 * 
 * 
 **************************************************************/
    // redis.pipeline().set('foo', 'bar').get('foo', function (err, result) {
    //   console.log('foo: ' , result);  // result === bar
    // }).exec(function (err, result) {
    //   console.log('result: ' , result);  //  result === [ [ null, 'OK' ], [ null, 'bar' ] ]
    // });
    
    redis.pipeline([
        ['set', 'string:test1', 'test-value-1'],
        ['get', 'hash:test'], // 使用错误的命令读取,此条命令返回错误的结果,后面的命令仍然正确执行
        ['set', 'string:test2', 'test-value-2'],
    ]).exec(function (err, result) { 
        line('pipeline test');
        console.log(err, result); 
        /**
         * err === null
         * result === [ [ null, 'OK' ],[ { [ReplyError: ....} ], [ null, 'OK' ] ]
         */
    });

    redis.multi([
        ['set', 'string:test3', 'test-value-3'],
        ['get', 'hash:test'], // 使用错误的命令读取,此条命令返回错误的结果,后面的命令仍然正确执行???[事务未回滚]
        ['set', 'string:test4', 'test-value-4'],
    ]).exec(function (err, result) { 
        line('multi test');
        console.log(err, result); 
        /**
         * err === null
         * result === [ [ null, 'OK' ],[ { [ReplyError: ....} ], [ null, 'OK' ] ]
         */
    }); 


        
});



