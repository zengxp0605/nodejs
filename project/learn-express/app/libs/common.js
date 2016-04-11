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


/**
 * 获取 app.get(), 回调函数中 request 变量的一些属性
 */
exports.getReqProps = function(req){
    if(!req)
        throw new Error('缺少req参数');
    return {
        baseUrl: req.baseUrl,
        cookies : req.cookies,
        protocol: req.protocol,
        hostname: req.hostname,
        ip: req.ip,
        ips: req.ips,
        method: req.method,
        originalUrl: req.originalUrl, // 这里是最原始的完整url
        url: req.url,  // 这里的url 是去除了use 时的路径
        path: req.path,
        params: req.params,
        query: req.query,
        route: req.route,
        secure: req.secure,
        subdomains: req.subdomains,
        xhr: req.xhr,
        body: req.body,  // post 请求,或者上传时查看[TODO: 待测试]
    };
};


