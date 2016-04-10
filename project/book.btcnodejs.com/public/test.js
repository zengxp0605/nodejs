var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.set('views', './views')
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

// 静态文件地址
app.use(express.static('./public', {
    maxAge: '0', //no cache
    etag: true
}));


var GitHubApi = require("github");

//下面的代码放在app.get('/', ...)之前
app.get('/search', function(req, res){
    var github = new GitHubApi({
        // required 
        version: "3.0.0",
        // optional 
        debug: true,
        protocol: "https",
        host: "api.github.com", // should be api.github.com for GitHub 
        pathPrefix: "", // for some GHEs; none for GitHub 
        timeout: 5000,
        headers: {
            "user-agent": "Jason demos" // GitHub is happy with a unique user agent 
        }
    });
    var msg = {
        q: 'nodejs',
        sort: 'forks',
        order: 'desc',
        per_page: 100
    }

    github.search.repos(msg, function(err, data) { //这里必须用`回调`函数，不能使用 var data = ...的方式，下篇细说
        res.json(data); //输出json格式的数据
    });
});







var server = app.listen(5001, function () {
  var host = server.address().address;
  var port = server.address().port;
  host == '::' && (host = '127.0.0.1');
  console.log('Example app listening at http://%s:%s', host, port);
});