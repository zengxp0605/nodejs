var fs = require('fs');
var readFrom = './demo.log';
var writeTo = './copy.log';

function proceed() {

    // create our read/write streams
    var readStream = fs.createReadStream(readFrom);
    var writeStream = fs.createWriteStream(writeTo, {
        'flags': 'w+'
    });

    // pipe all stream
    readStream.pipe(writeStream);


    // listen for error
    readStream.on('error', () => {
        console.log('readStream error');
    });
    writeStream.on('error', () => {
        console.log('writeStream error');
    });

    // when the read is done, empty the file and check for retain option
    readStream.on('end', function () {
        // 截取文件,仅保留0字符, 相当于清除文件内容
        fs.truncate(readFrom, function (err)  {
            console.log('"' + writeTo + '" has been created');

        });
    });
}

// 文件内容截取操作 测试
function testTruncate() {

    fs.truncate('./demo.log', 10, function (err) {
        if (err) {
            throw err;
        }
        console.log('文件内容截断成功');
    });
}

// testTruncate();

proceed();

