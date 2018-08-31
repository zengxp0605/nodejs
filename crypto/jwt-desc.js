const base64url = require('base64url');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function toBase64(data) {
    // 使用其他模块
    return base64url(JSON.stringify(data));
}

var header = {
    "typ": "JWT",
    "alg": "HS256"
};

var payload = {
    "iss": "TEST JWT",
    "exp": 1513864661,
    "aud": "www.example.com",
    "sub": "test@example.com",
    "from_user": "B",
    "target_user": "A"
};

var secret = 'my-secret';

// 这个方法还有问题
function getSign(message = 'my message') {
    const hash = crypto.createHmac('sha256', secret)
        .update(message)
        .digest('hex');
    console.log('hash: ', hash);
    return hash;
}

// console.log(toBase64(header), toBase64(payload), getSign());

var encodedString = toBase64(header) + '.' + toBase64(payload);
var signStr = getSign(encodedString);
var token = encodedString + '.' + signStr;
console.log('token: ', token);

// 这里可以正常的解析出来, 因为header和payload只是base64转码,并未加密
console.log('decode: ', jwt.decode(token));

// 这里无法通过验证?? 
// console.log('verify: ', jwt.verify(token, secret));

/**
 * token 客户端发送
  fetch('api/user/1', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
 })
 */

// 参考: [http://blog.leapoahead.com/2015/09/06/understanding-jwt/](http://blog.leapoahead.com/2015/09/06/understanding-jwt/)
// 参考: [http://www.jianshu.com/p/576dbf44b2ae](http://www.jianshu.com/p/576dbf44b2ae)
