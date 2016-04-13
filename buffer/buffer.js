var fs = require('fs');

var filePath = 'logo.png';
fs.readFile(filePath, function (err, originBuffer) {
    console.log(Buffer.isBuffer(originBuffer));

    // 通过buffer写入新文件
    fs.writeFile('logo_buffer.png', originBuffer, function(err){
        if(err) throw new Error(err);
    });

    // 将图片转换为base64编码
    var base64Image = originBuffer.toString('base64');

    console.log(base64Image);

    // 解码base64
    var decodeImage = new Buffer(base64Image, 'base64');

    // 比较两个buffer 是否一致
    console.log(Buffer.compare(decodeImage, originBuffer));  // 0

    fs.writeFile('logo_decode.png', decodeImage, function(err){
        if(err) throw err;
    });
});