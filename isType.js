
var toString = Object.prototype.toString;

var str = 'ssssss';

var fun = function(){console.log(111);};

console.log(
    toString.call(str),  //  [object String]
    toString.call(fun),  //  [object Function] 
    null
);

var isString = function(obj){
    return toString.call(obj) === '[object String]';
};


var isFunction = function(obj){
    return toString.call(obj) === '[object Function]';
};

console.log(
    isString(str),      // true
    isFunction(fun),    // true
    null
);



/**********************************/
/**
 *  偏函数的写法
 */

function isType (type){
    console.log(type);
    return function (obj) {
        console.log(obj);
        return toString.call(obj) === '[object ' + type + ']';
    };
}


var isString = isType('String');
var isFunction = isType('Function');


console.log(isString, isFunction);

console.log(
    isString(str),      // true
    isFunction(fun),    // true
    null
);
