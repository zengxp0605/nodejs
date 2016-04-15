/**
 * 路由
 * @Author: Jason Zeng
 * @Email:  xiaoping_zeng@faxmail.com
 * @Date:   2016-4-10 
 */
'use strict';

var common = require('./libs/common');

var resWrite = function(res, msg, noHeader, noEnd){
    !noHeader && res.writeHead(200,{'Content-type':'text/plain','charset':'UTF-8'});
    res.write(msg);
    !noEnd && res.end();   
};



module.exports = function(){
    console.log('test: log');
    //console.debug('test: debug');
    console.error('test: error');
    console.info('test: info');

    // 设置模板文件路径和模板引擎
    app.set('views', __dirname + '/views'); // general config
    // 模板引擎设置跟view 文件的后缀有关, 
    // 1.如果是html的后缀,可以如下设置
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');
    
    // 2.如果写成 .ejs的后缀,则如下设置设置即可
    app.set('view engine', 'ejs');

    // 通过Router 做路由
    // _testRouter();
    // return;

    // 匹配所有的, 类似于过滤器
    app.all(['/user/*', '/u/*'], function(req, res, next){
        console.log('requireAuthentication');
        next();
    }, function(req, res, next){
        console.log('loadUser');
        // 设置cookies
        res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
        res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });

        // 清除cookie
        //res.clearCookie('name', { path: '/admin' });

        // 设置 location [TODO: 无法使用???]
        //res.location('/foo/bar');
        //res.location('http://www.baidu.com');
        //return;
        //res.location('back');
        //
        // 跳转
        //res.redirect('/admin/secret');
        // res.redirect('http://www.baidu.com');
        // res.redirect('back'); // 返回来源页面
        
        next();
    });


    app.get('/', function(req, res){
        console.log('load index,__dirname: ' + __dirname);

        // res.send('Get index ');

        res.render('index', {users: ['Jason', 'Mary']});
    });

    app.get('/user/:uid', function(req, res){
        console.log('load user home');
        res.json(common.getReqProps(req));
        // res.send('User: ' + req.params.uid);
    });


    app.param('uid', function(req, res, next, id) {

        console.log('id: %s', id);
        next();
    
    });

    // 直接显示文件内容到网页
    app.get('/file/:name', function (req, res, next) {
      var options = {
        root: __dirname + '/../public/tmp/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
      };

      var fileName = req.params.name;
      res.sendFile(fileName, options, function (err) {
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
        else {
          console.log('Sent:', fileName);
        }
      });
    });

    // 下载测试
    app.get('/download/:file',function(req, res){
        var _path = __dirname + '/../public/tmp/';
        var fileName = req.params.file;
        res.download(_path + fileName, fileName, function(err){
          if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
            console.log(err);
            res.json(err);
          } else {
            // decrement a download credit, etc.
            console.log('Download: ', _path + fileName);
            // 这里已经无法结束下载
            res.end('<p>test end!</p>');
          }
        });
    });

    app.get('/appProps', function(req, res){
        var _prop = common.getAppProps();
        res.send(_prop);
    });

    app.get('/reqProps', function(req, res){
        var _prop = common.getReqProps(req);
        res.send(_prop);
    });

    _initApis();
};

// api 
var _initApis = function(){

    var api = require('express')();

    app.use(['/api','/apis'], api);

    api.all('*', function(req, res, next){
        console.log('api requireAuthentication');
        next();
    });

    api.post('/test',function(req, res){
        res.json({
            api :'test',
            mothed : 'post',
        });
    });

    api.get('/test',function(req, res){
        //console.log(req);
        res.json({
            api :'test',
            mothed : 'get',
        });
    });
};


//// 通过Router 做路由
var _testRouter =function(){
    var express = require('express');
    var r1 = express.Router();
    r1.get('/', function (req, res, next) {
        console.log('router 1');
        next();
    });

    var r2 = express.Router();
    r2.get('/', function (req, res, next) {
        console.log('router 2');
        next();
    });

    app.use('/', [r1, r2]);

    var _index = function(req, res){
        res.send('router index');
    };
    app.get('/', _index);
    return;
};

