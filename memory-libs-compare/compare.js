
const moment = require('moment');
const _shared = true;
const _loki = true;
const _redis = true;

if (_redis) {
    var ioredis = require('ioredis');
    var redis = new ioredis('redis://127.0.0.1:6379/1', {
        enableReadyCheck: true,
        dropBufferSupport: true,
        retryStrategy: times => {
            console.info(`Redis reconnecting...`);
            return Math.min(times * 2, 2000);
        }
    });

}

// ### Setting property
{
    // test plain object
    var plain = {};
    console.time('plain obj');
    for (var i = 0; i < 1000000; i++) {
        plain['test' + i] = i;
    }
    console.timeEnd('plain obj');
}

mem();

if (_shared) {
    // test shared cache
    var cache = require('node-shared-cache');
    var obj = new cache.Cache("test", 1048576);
    console.time('shared cache');
    for (var i = 0; i < 1000000; i++) {
        obj['test' + i] = i;
    }
    console.timeEnd('shared cache');
}
mem();
if (_loki) {
    // test lokijs
    var lokidb = require('lokijs')
    var db = new lokidb('test_mem');

    var doc = db.addCollection('test', { unique: ['key'], autoupdate: true });
    // doc.insert({ time: Date.now() });
    console.time('lokijs cache');
    for (var i = 0; i < 1000000; i++) {
        let key = 'test' + i;
        doc.insert({ key });
    }
    console.timeEnd('lokijs cache');
}
mem();
if (_redis) {
    console.time('redis cache');
    for (var i = 0; i < 1000000; i++) {
        let key = 'test' + i;
        redis.set(key, i);
    }
    console.timeEnd('redis cache');
}
/**
The result is:

plain obj: 3828.536ms
shared cache: 9867.463ms
lokijs cache: 18202.798ms
 */


// ### Getting property
if (_loki) {
    console.time('read lokijs cache');
    for (var i = 0; i < 1000000; i++) {
        let key = 'test' + i;
        let r = doc.by('key', key);
        // console.log('n - r', r);
    }
    console.timeEnd('read lokijs cache');
}
mem();
{
    console.time('read plain obj');
    for (var i = 0; i < 1000000; i++) {
        plain['test' + i];
    }
    console.timeEnd('read plain obj');
}
mem();
if (_shared) {
    console.time('read shared cache');
    for (var i = 0; i < 1000000; i++) {
        obj['test' + i];
    }
    console.timeEnd('read shared cache');
}
mem();
if (_redis) {
    console.time('read redis cache');
    for (var i = 0; i < 100000; i++) {
        let key = 'test' + i;
        redis.get(key);
    }
    console.timeEnd('read redis cache');
}
/**
The result is:

read lokijs cache: 2328.279ms
read plain obj: 922.495ms
read shared cache: 9824.456ms
*/



function time() {
    return moment().format('YYYYMMDD HH:mm:ss');
}

/**
 * 记录进程内存信息
 */
function mem() {
    let memory = process.memoryUsage(),
        rss = (memory.rss / 1024 / 1024).toFixed(2),
        heapTotal = (memory.heapTotal / 1024 / 1024).toFixed(2),
        heapUsed = (memory.heapUsed / 1024 / 1024).toFixed(2);
    // console.log(memory);
    //console.info(`${time()} MEM rss: ${rss} MB heapTotal: ${heapTotal} MB heapUsed: ${heapUsed}`)
};
