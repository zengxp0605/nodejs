'use strict';

///////////////////////////
//      test1            //
///////////////////////////
var cardModel = {
    _test:'test',
    send:() => {
        console.log('card send');   

    },
    change:() => {
        cardModel._test += ' change';  //  这里不能使用this
        console.log(this, _test); 
    },
};

this.test = 'test';
var _test = 'private test';
this.testFun = (val) => {
    console.log(val);

};

exports.testFun1 = (val) => {
    console.log(val);

};

cardModel.testFun2 = (val) => {
    console.log('testFun2');

};


///////////////////////////
//      test2            //
///////////////////////////
var cardModel2 = (function (){

    var _priv = {a: 111, b: 22222};

    function change (){
        _priv.a += ' change';
        console.log(_priv.a);
    }

    return {
        change: change,
    };
})();

///////////////////////////
//      test3            //
///////////////////////////
function cardModel3(){

    var _priv = {a: 333, b: 22222};

    cardModel3.change = ()=>{
        _priv.a += ' change';
        console.log(_priv.a);
    }

    return cardModel3;
};

module.exports = cardModel;





