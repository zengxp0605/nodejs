var Q = require('q');

var mysql = require('mysql').createConnection({    
	host     : '127.0.0.1',       //主机
	user     : 'root',               //MySQL认证用户名
	password : 'root',
	port	 : '3306', 
	database: 'test99'
});

var sql_news = 'select * from test_news limit ?';
var val = [3];
// 原始的方式
// var query = mysql.query(sql_news,val,function(err,result,fields){

// 	console.log(err,result,fields);
// 	console.log(this.sql);
// 	console.log("---------------------");
// });
// console.log(query.sql);


// 封装 promise
var promiseQuery = function(sql,val){
    var defer = Q.defer();
	mysql.query(sql,val,function(err,result){
		console.log("SQL=>"+ this.sql);
		if(err){
			defer.reject(err);
		}else{
			defer.resolve(result);
		}
	});
	return defer.promise;
}

promiseQuery(sql_news,val).then(function(news_data){
	console.log(news_data);
	return promiseQuery('select * from t1 limit ?',[news_data.length]);
}).then(function(t1_data){
	var num = t1_data.length;
	return Q.all([
			promiseQuery('select * from t1 limit ?',[num]),
			promiseQuery('select * from t1 limit ?,?',[num,num])
		])
}).then(function(result){
	console.log(result);
})
.catch(function(err){
	console.error('catch: ',err);
}).done();

/// 链式调用测试
Q.delay(2000).then(function(){
	console.log('');
	console.log('=============延时2s delay 的分割线================');

	var getMysqlFun1 = function(){
		return Q.ninvoke(mysql,'query','select 1');
	}
	var getMysqlFun2 = function(){
		return Q.ninvoke(mysql,'query','select 2');
	}
	var getMysqlFun3 = function(){
		return Q.ninvoke(mysql,'query','select 3');
	}
	Q.fcall(getMysqlFun1).then(function(rs1){
			console.log('---- getMysqlFun1 res:',rs1[0]);
			// 不返回仍然可以 .then
		})
		.then(getMysqlFun2).then(console.log)
		.then(getMysqlFun3).then(console.log)
		.done();

});

