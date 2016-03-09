
var _ = require('underscore');

//***********each: 对集合循环操作
_.each([11,12,13],function(ele,idx){
	console.log(idx + ' : ' + ele);
});
/* output
0 : 11
1 : 12
2 : 13
*/

var obj = {
    a1:{aa1:'aaa',aa2:'aaaaa2'},
    b1:{bb1:'bbb',bb2:'bbb2'}
};

_.each(obj,function(ele,idx){
     console.log(idx , ' : ' , ele);
    _.each(ele,function(ele2,idx2){
        console.log(idx2 , ' : ' , ele2);
    });
});

console.log('--------------分割线1-----------------');



//*******map: 对集合以map方式遍历，产生一个新数组
var r = _.map([1,2,3],function(ele){
	return ele * 3;
});
console.log('map:',r);  // output: [3,6,9]


//*******reduce: 集合元素合并集的到memo
console.log('reduce:',
    _.reduce([1, 2, 3], function (memo, ele) {
        return memo + ele;
    }, 0)
); //  6


//*******filter: 过滤集合中符合条件的元素。注：find:只返回第一个
console.log('filter:',
    _.filter([1, 2, 3, 4, 5, 6], function(num){
        return num % 2 == 0;
    })
);
//=> [ 2, 4, 6 ]


//********reject: 过滤集合中不符合条件的元素
console.log('reject:',
    _.reject([1, 2, 3, 4, 5, 6], function(num){
        return num % 2 == 0;
    })
);
//=> [ 1, 3, 5 ]

//********pluck: 提取一个集合里指定的属性值
var users = [
    {name: 'moe', age: 40},
    {name: 'larry', age: 50}
];
console.log('pluck:',
    _.pluck(users, 'name')
);
//=> [ 'moe', 'larry' ]


console.log('--------------分割线2-----------------');

var stooges = [{name : 'curly', age : 25}, {name : 'moe', age : 21}, {name : 'larry', age : 23}];
var youngest = _.chain(stooges)
    .sortBy(function(stooge){ return stooge.age; })
    .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
    .first()
    .value();
console.log(youngest);

var test = _.sortBy(stooges,'age');

console.log('sortBy1',test);

console.log('sortBy2',
    _.sortBy(stooges,function(stooge){
        return -stooge.age;  // 这样可以倒序排列
    })
);


console.log('sortBy3',
    _.sortBy([3, 4, 2, 1 , 6], function (num) {
        return Math.min(num);
    })
);


console.log('');
//  -===> http://www.css88.com/archives/5443
console.log('see:','http://www.css88.com/archives/5443');