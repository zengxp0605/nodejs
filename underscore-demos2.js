
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

console.log('-------------1-----------');

var obj2 = {
    11:{a:1,b:2,c:3},
    22:{d:4,e:5,f:6}
}
var arr4 = _.map(obj2,function(elem, index) {
    return JSON.stringify(elem);  // 原有的键值被重排
})
console.log(arr4);

console.log('contains',

    _.contains([1, 2, 3], 3),
    _.contains([1, 2, 3,4,5,6], [3,6]),  // 不能直接判断数组
    _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]), // 合并数组,并去重复, 可以对比前后的length 判断数组是否在数组中

    ''
);




console.log('-----------2-------------');

var arr = [1, 2, 1, 0, 3, 1, 4];

console.log(
    _.without(arr , 0 , 1 ),

    _.without.apply(null, [arr, 0, 1])
);

var brr = [0, 1];  // 去除数组
brr.unshift(arr);

console.log(
     _.without.apply(null, brr)
);


// union,intersection,difference,uniq: 并集，交集，差集，取唯一

console.log(_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]));
console.log(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]));
console.log(_.difference([1, 2, 3, 4, 5], [5, 2, 10]));
console.log(_.uniq([1, 2, 1, 3, 1, 2]));
