var Q = require('q');

function eventually(value) {
    return Q.delay(value, 2000); // === Q(value).delay(2000);
}

Q.all([1, 2, 3].map(eventually))
.done(function (result) {
    console.log(result);
});

Q.all([
    eventually(10),
    eventually(20)
])
.spread(function (x, y) {
    console.log(x, y);
})
.done();

/************************
 *  test
 **********************/
var testFun1 = function(v){
	return 'test1: ' + v; 
}
var testFun2 = function(v){
	return 'test2: ' + v; 
}

Q.all([
    testFun1(10),
    testFun2(20)
])
.spread(function (x, y) {
    console.log(x, y);
    return Q.delay('test msg',5000);
}).then(function(rs){
	console.log('delay 5s message: '+ rs);
})
.done();

