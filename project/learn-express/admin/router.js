/**
 * Admin 路由
 * @Author: Jason Zeng
 * @Email:  xiaoping_zeng@faxmail.com
 * @Date:   2016-4-10 
 */
'use strict';

var common = require('../app/libs/common');

// 子站点路由配置, test
var _subDomainTest = function(admin){
    var secret = require('express')();
    secret.get('/', function (req, res) {
      console.log(secret.mountpath); // /secr*t
      res.json(common.getReqProps(req));

      //res.send('Admin Secret');
    });

    admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
};


module.exports = function(admin){

    _subDomainTest(admin);

    admin.get('/', function (req, res) {
      console.log(admin.mountpath); // /admin
      res.send('Admin Homepage');
    });

    admin.get('/appProps', function(req, res){
        var _prop = common.getAppProps(admin);
        res.send(_prop);
    });
};

