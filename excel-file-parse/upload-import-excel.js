var http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');

var Busboy = require('busboy');

var express = require('express');
var app = express();

var nodeXlsx = require('node-xlsx').default;
var XLSX = require('xlsx');

var tmpDir = path.join(__dirname, 'tmpFile');
console.log(tmpDir, os.tmpdir());

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
            var saveTo = path.join(tmpDir, filename);
            // 这里保存文件,
            console.log('saveTo: ', saveTo, fieldname, filename);
            file.pipe(fs.createWriteStream(saveTo).on('finish', function () {
                // 写入结束后可以读取
                _importExcel(filename);
            }));

            // 这里可以直接读取到数据(分别使用两种模块处理)
            file.on('data', function (data) {

                // console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                // var workbook = XLSX.read(data);
                // console.log('workbook: ', workbook);

                // const workSheetsFromBuffer = nodeXlsx.parse(data);
                // console.log('workSheetsFromBuffer: ', JSON.stringify(workSheetsFromBuffer));

                // fs.writeFileSync(path.join(tmpDir, 'tmp.json'), JSON.stringify(workSheetsFromBuffer), 'utf8');
            });
        });

        busboy.on('finish', function () {
            res.writeHead(200, { 'Connection': 'close' });
            res.end("That's all folks!");
        });
        return req.pipe(busboy);
    }

    let filePath = __dirname + '/upload.html';
    console.log(filePath);
    res.sendFile(filePath);
});

function _importExcel(fileName) {
    console.log('fileName: ', fileName);
    // Parse a buffer
    // const workSheetsFromBuffer = nodeXlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
    // Parse a file
    var filePath = path.join(tmpDir, fileName);

    const workSheetsFromFile = nodeXlsx.parse(filePath);
    console.log(filePath, JSON.stringify(workSheetsFromFile));

    fs.writeFileSync(path.join(tmpDir, 'tmp.json'), JSON.stringify(workSheetsFromFile), 'utf8');
}

// _importExcel();

server.listen(PORT);
console.log('Server listening on port ' + PORT);