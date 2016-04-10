/**
 * 通用方法
 * @Author: Jason Zeng
 * @Email:  xiaoping_zeng@faxmail.com
 * @Date:   2016-4-10 
 */
'use strict';

// Object to json
exports.toJson = function (obj) {
    return JSON.stringify(obj);
};

// Json to Object
exports.toObject = function (str) {
    return JSON.parse(str);
};

/**
 * 获取 app 变量的一些 属性
 * @return {[type]} [description]
 */
exports.getAppProps = function(app){
    app = app ? app : global.app;
    return {
        locals : app.locals,
        mountpath : app.mountpath, 
        METHOD : app.METHOD,
        'path()' : app.path(),
        
    };
};