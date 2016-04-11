
'use strict';

var someObject = {
    name : 'Jason',
    sayHello:function(name) {
        console.log('Hello ' + name);
    },
};

exports.test = function(){};

module.exports.foo = function(){};

someObject.fun = function(){};

// function Foo(name){
//     this.name = name;
//     this.sayHello = function(){
//         console.log(this.name + ' say: Hello');
//     };
// }

// module = {};
// console.log(module,'----------', require);
 module.exports = someObject;
