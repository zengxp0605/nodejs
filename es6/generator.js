function* dowork(a) {
    var sum = yield a + 2;
    sum = yield a + 4;
    sum = yield a + 5;
    sum = yield Promise.resolve(a + 10);
}

var gen = dowork(10);
console.log(gen);
console.log('----', gen.next());
console.log('----', gen.next());
console.log('----', gen.next());
console.log('----', gen.next());
console.log('----', gen.next());