//需要使用的模块 http   url
//当前url   http://localhost:8888/select?aa=001&bb=002
var http = require('http');
var URL = require('url');

http.createServer(function(req, response) {
    var p = URL.parse(req.url, true);
    p.testUrl = req.url; // 这里拿不到完整的 href ????
    console.log(req);
    var arg = URL.parse(req.url).query; //方法一arg => aa=001&bb=002
    var arg = URL.parse(req.url, true).query; //方法二arg => { aa: '001', bb: '002' }
    // console.log(arg.aa); //返回001
    // console.log(arg.bb); //返回002
    //然后就可以根据所得到的数据处理了
    response.writeHead(200, {
        'Content-Type': 'text/json',
    });
    response.write(JSON.stringify(p));

    response.end();
}).listen(8888); //建立服务器并监听端口


var testUrl = 'https://wap.test.com.cn:8888/select/index.php/id/123?aa=001&bb=002#demo';
var p = URL.parse(testUrl);
var rs = {
    href: p.href, //取到的值是：http://localhost:8888/select?aa=001&bb=002
    protocol: p.protocol, //取到的值是：http: 
    hostname: p.hostname, //取到的值是：locahost
    host: p.host, //取到的值是：localhost:8888
    port: p.port, //取到的值是：8888
    path: p.path, //取到的值是：/select?aa=001&bb=002
    pathname: p.pathname, //取到的值是：/select?aa=001&bb=002
    hash: p.hash, //取到的值是：null 
    query: p.query, // 取到的值是：aa=001
};

console.log(rs);


var p = URL.parse(testUrl, true);
var rs = {
    href: p.href, //取到的值是：http://localhost:8888/select?aa=001&bb=002
    protocol: p.protocol, //取到的值是：http: 
    hostname: p.hostname, //取到的值是：locahost
    host: p.host, //取到的值是：localhost:8888
    port: p.port, //取到的值是：8888
    path: p.path, //取到的值是：/select?aa=001&bb=002
    pathname: p.pathname, //取到的值是：/select?aa=001&bb=002
    hash: p.hash, //取到的值是：null 
    query: p.query, // 取到的值是：aa=001
};

console.log(rs);

console.log('');

