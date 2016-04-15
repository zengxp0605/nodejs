
var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200,{'Content-type':'text/plain','charset':'UTF-8'});
    var content = fs.readFileAsync('./assets/index.html');
    res.wrire(content);
    res.end();
}).listen(5001);
