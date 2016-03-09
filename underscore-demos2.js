
var _ = require('underscore');

function test(){
    console.log(arguments);
    _.each(arguments,function(ele,idx){
        console.log("idx: ",idx," ele: ",ele);
    });
}

test(1,2,3,4);



var arr2 = [11,22,33].map(function(elem, index) {
    return elem + '' + index;
})
console.log(arr2);

var obj1 = {
    'a':11,
    'b':22,
    'c':33
}
var arr3 = _.map(obj1,function(elem, index) {
    return elem + '' + index;
})
console.log(arr3);

console.log('------------------------');

var obj2 = {
    11:{a:1,b:2,c:3},
    22:{d:4,e:5,f:6}
}
var arr4 = _.map(obj2,function(elem, index) {
    return JSON.stringify(elem);  // 原有的键值被重排
})
console.log(arr4);


