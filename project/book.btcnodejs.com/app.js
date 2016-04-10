var express = require('express');
var app = express();


app.set('views', './app/views')
app.set('view engine', 'ejs');


// 静态文件地址
app.use(express.static('./public', {
    maxAge: '0', //no cache
    etag: true,
}));

// 启动路由
require('./app/route')(app);

var server = app.listen(5001, function () {
  var host = server.address().address;
  var port = server.address().port;
  host == '::' && (host = '127.0.0.1');
  console.log('Example app listening at http://%s:%s', host, port);
});