
var EventEmitter = require('events').EventEmitter;
var secretMessage = new EventEmitter();

secretMessage.on('message', function (data) {
   console.log(data); 
});

secretMessage.on('self destruct', function () {
    console.log('the msg is destroyed!');
});

secretMessage.emit('message','this is a secret message.It will self deatruct in 5s');

setTimeout(function () {
   secretMessage.emit('self destruct');
},5000);

var Promise = require('q');

var words = '你好，你是谁？',
    len = 0;

function count(num,ms,cb){
    var pro = Promise.resolve();
    for (var i = 0; i < num; i++) {
        pro = pro.delay(ms).then(function(v){
            return cb(v);
        });
    };
}
count(words.length,800,function(){
    var w = words.substr(0,++len);
    console.log(w);
})