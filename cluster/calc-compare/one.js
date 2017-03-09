
function fibo(n) {
	return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

var total = 5
function back() {
	if (!--total) return console.timeEnd('no thread');
}

console.time('no thread');

process.nextTick(function () {
	console.log(fibo(40));
	back();
})
process.nextTick(function () {
	console.log(fibo(40));
	back();
})
process.nextTick(function () {
	console.log(fibo(40));
	back();
})
process.nextTick(function () {
	console.log(fibo(40));
	back();
})

process.nextTick(function () {
	console.log(fibo(40));
	back();
})
