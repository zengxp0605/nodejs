
// client

var params = "jwt=" + io.data.token + "&commKey=" + io.data._commKey;
var jsencrypt = new JSEncrypt();
jsencrypt.setPublicKey(io.data.publicKey);
io.data.encryptedString = jsencrypt.encrypt(params);
console.log('----初始化数据后: ', io.data);

primus.on('outgoing::url', function (url) {
	url.query = 'login=' + io.data.encryptedString;
	console.log("outgoing::url", url.query);
});


// decy

io.onData = function (data) {


	//解密
	var decryptstr = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(io.data._commKey), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});

	var dataString = decryptstr.toString(CryptoJS.enc.Utf8);
	var parsedData = JSON.parse(dataString);
	console.log("接收到数据：", parsedData.cmd, parsedData);

	//更新jwt token
	if (parsedData.cmd == io.cmd.CONN_INIT) {
		io.data.jwtToken = parsedData.res;
	}
	else {
		//检测是否有已注册事件回调
		var action = registedAction[parsedData.cmd];

		if (action && typeof action == "function") {
			action(parsedData.res);
		}
	}

	return this;
}

io.emit = function (data) {
	//为data增加token
	if (data.params) {
		data.params.jwt = io.data.jwtToken;
	}
	else {
		data.params = { jwt: io.data.jwtToken };
	}

	data.status = { time: new Date().getTime() };

	console.log("发送数据：", JSON.stringify(data));

	//加密
	var encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(io.data._commKey), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	//发送加密数据
	primus.write(encryptData.toString());

	return this;
}

