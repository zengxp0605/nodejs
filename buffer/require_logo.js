var http = require('http');
var fs = require('fs');
var request = require('request');

http.createServer(function (req, res) {
    // fs.readFile('logo.png', function(err, data){
    //     if(err) {
    //         res.send('file not exists!');
    //     }else{
    //         res.writeHead(200, {'Content-type':'text/html'})    
    //         res.end('<img src="data:image/jpg;base64,'+data.toString('base64')+'" />');
    //     }
    // });
    // 读取本地图片并显示
    // fs.createReadStream('logo.png').pipe(res);
    //  读取远程图片并显示
    request('https://avatars1.githubusercontent.com/u/8370203?v=3&s=460').pipe(res);
}).listen('8090');


