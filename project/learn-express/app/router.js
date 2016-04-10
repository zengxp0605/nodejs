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

    // 通过Router 做路由
    // _testRouter();
    // return;

    // 匹配所有的, 类似于过滤器
    app.all(['/user/*', '/u/*'], function(req, res, next){
        console.log('requireAuthentication');
        next();
    }, function(req, res, next){
        console.log('loadUser');
        next();
    });


    app.get('/', function(req, res){
        console.log('load index');

        res.send('Get index ');
    });

    app.get('/user/:uid', function(req, res){
        console.log('load user home');

        res.send('User: ');
    });


    app.param('uid', function(req, res, next, id) {

        console.log('id: %s', id);
        next();
    
    });




    app.get('/appProps', function(req, res){
        var _prop = common.getAppProps();
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

