var http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');

var Busboy = require('busboy');

var express = require('express');
var fs = require('fs');
var app = express();

var server = require('http').createServer(app);
var PORT = '5050';

app.get('/', function (req, res) {
    res.send('hello world<br/>' + Math.random());
});

app.all('/uploadFile', function (req, res) {
    if (req.method === 'POST') {
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            // var saveTo = path.join(os.tmpdir(), path.basename(fieldname));
            var saveTo = path.join(__dirname, '../tmpFile', filename);
            console.log('saveTo: ', saveTo, fieldname, filename);
            file.pipe(fs.createWriteStream(saveTo));
        });
        busboy.on('finish', function () {
            res.writeHead(200, { 'Connection': 'close' });
            res.end("That's all folks!");
        });
        return req.pipe(busboy);
    }
    let filePath = __dirname + '/upload.html';
    console.log(filePath, fs.readFileSync(filePath));
    res.sendFile(filePath);
});

server.listen(PORT);
console.log('Server listening on port ' + PORT);