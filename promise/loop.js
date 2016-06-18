var test = {};

var Q = require('q');
var _ = require('underscore');

var tableList = []; // 存储id, 相当于redis 的一个set

// 测试创建桌子
test.createTable = function(params, socket) {

    _getUniqTableId().then(function(result){
        console.log('result: ', result );
        console.log('--------------------------');
        console.log('tableList: ', tableList.join(',') ,' len: ' + tableList.length);
    }).fail(function(error){
        console.log('{test.createTable},error: ' + error);
    }).done(); 
};

var _getUniqTableId = function() {
    var arr = [];
    var i = 0;
    while(true){
        if(i++ == 150)  break; // 测试的次数
        (function(_i) {
            var id = _.random(0 ,10);
            arr[_i] = function(){
                return _isIdExists(id, _i);
            }; 
        })(i);
    }
    var initialVal = 0; // 这个值这里用不到
    return arr.reduce(function (soFar, f) {
        return soFar.then(f).then(function(rs){
            console.log('rs: ' ,rs);
            return rs;
        });
    }, Q(initialVal));
};

// 模拟redis 中异步判断id 是否存在于 set中
// 假设查询需要耗费 500 毫秒
function _isIdExists(id, _i){   
    var deferred = Q.defer();
    setTimeout(function(){
        var isExists = _.contains(tableList, id);
        if(!isExists){
            tableList.push(id);
        }
        console.log('tableList: ', _i ,'->', tableList.join(','));
        deferred.resolve({id: id, isExists: isExists});  // true 表示存在
    }, 10); 

    return deferred.promise;
};

// 模拟调用
test.createTable();

/**************************************************/
function foo(){
    var deferred = Q.defer();
    setTimeout(function(){
        console.log('call-----foo');
        deferred.resolve('foo');
    }, 500); 
    return deferred.promise;
};

function bar(){
    var deferred = Q.defer();
    setTimeout(function(){
        console.log('call-----bar');
        deferred.resolve('bar');
    }, 500); 
    return deferred.promise;
};

function baz(){
    var deferred = Q.defer();
    setTimeout(function(){
        console.log('call-----baz');
        deferred.resolve('baz');
    }, 500); 
    return deferred.promise;
};

function qux(){
    var deferred = Q.defer();
    setTimeout(function(){
        console.log('call-----qux');
        deferred.resolve('qux');
    }, 1000); 
    return deferred.promise;
};

var initialVal = 'aaa';
var list = [];
var testLoop = function(){
    var funcs = [foo, bar, baz, qux];
     return funcs.reduce(function (soFar, f) {
        return soFar.then(f).then(function(rs){
            console.log('rs: ' ,rs);
        });
    }, Q(initialVal));
    // var result = Q(initialVal);
    // funcs.forEach(function (f) {
    //     console.log(f);
    //     result = result.then(f).then(function(rs){
    //         console.log('rs: ' ,rs);
    //         list.push(rs);
    //         console.log(list);
    //         return rs;
    //     });
    // });
    // return result;
};

// testLoop().then(function(rs){
//     console.log('rs2: ' ,rs);
// });