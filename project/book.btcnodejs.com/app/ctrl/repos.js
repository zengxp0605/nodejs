var Repo = require('../model/repo');

exports.index = function (req, res) {
    res.render('index');
};

exports.search = function (req, res) {
    Repo.search(req.query.query, function(err, data) {
        res.json(data);
    });
    
    return;

    var GitHubApi = require("github");

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

};