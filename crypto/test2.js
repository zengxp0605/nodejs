
///////////////////////////
// 加密解密算法
///////////////////////////
var crypto = require('crypto')
    , fs = require('fs');

var iv = '2624750004598718';

//加密
function aesEncrypt(algorithm, key, buf) {
    var encrypted = "", cip;
    cip = crypto.createCipher(algorithm, key);
    // encrypted += cip.update(buf, 'binary', 'hex');
    // encrypted += cip.final('hex');

    // cip = crypto.createCipheriv(algorithm, key, iv);
    encrypted += cip.update(buf, 'utf8', 'base64');
    encrypted += cip.final('base64');

    return encrypted;
}

//解密
function aesDecypt(algorithm, key, encrypted) {
    var decrypted = "", decipher;
    decipher = crypto.createDecipher(algorithm, key);
    // decrypted += decipher.update(encrypted, 'hex', 'binary');
    // decrypted += decipher.final('binary');

    // decipher = crypto.createDecipheriv(algorithm, key, iv);
    decrypted += decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

function cipherDecipherFile(filename, algorithm, key) {
    fs.readFile(filename, "utf-8", function (err, data) {
        if (err) throw err;
        var s1 = new Date();

        let encryptedStr = aesEncrypt(algorithm, key, data);
        var s2 = new Date();

        let decStr = aesDecypt(algorithm, key, encryptedStr);
        var s3 = new Date();

        console.log('cipher:' + algorithm + ',' + (s2 - s1) + 'ms');
        console.log('decipher:' + algorithm + ',' + (s3 - s2) + 'ms');

        // console.log(encryptedStr);
        console.log(decStr);
    });
}

//console.log(crypto.getCiphers());
var algs = ['aes-256-ecb', 'aes-256-cbc'];
var key = "f2df911f40e74b2b9bb3d53a7ca4b78d438d511e015d4b50431eaea65339380d";
console.log(key.length);
var filename = "test1.js";//"package.json";

cipherDecipherFile(filename, 'aes-256-cbc', key);

// algs.forEach(function (name) {
//     cipherDecipherFile(filename, name, key);
// })

