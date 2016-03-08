
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
