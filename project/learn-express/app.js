/**
 * 
 * @Author: Jason Zeng
 * @Email:  xiaoping_zeng@faxmail.com
 * @Date:   2016-4-10 
 */
'use strict';

var express = require('express');
var app = express(); // main app

global.app = app; // 存储全局app 变量

// 加载通用配置
var setting = require('./config/common.json');
app.set('setting', setting); // 可以通过 app.get('setting') 获取

// 静态文件地址, 静态文件加载 /static/css/index.css
// app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public', {
    maxAge: '0', //no cache
    etag: true,
}));


// 启动路由
require('./app/router')();

// 是否配置后台路由
if(setting.admin){
    var admin = express(); // sub app for Admin

    // The mount event is fired on a sub-app, when it is mounted on a parent app
    admin.on('mount', function (parent) {
      console.log('Admin Mounted');
      //console.log(parent); // refers to the parent app
    });

    //app.use('/admin', admin); // mount the sub app
    app.use(['/adm*n', '/manager'], admin); // 配置多个url 
    // 启动后台路由
    require('./admin/router')(admin);
}



var server = app.listen(setting.port, function () {

  var host = server.address().address;
  var port = server.address().port;
  host == '::' && (host = '127.0.0.1');

  console.log('Example app listening at http://%s:%s', host, port);
});



