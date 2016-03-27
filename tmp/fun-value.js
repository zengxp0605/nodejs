'use strict';
var _ = require('underscore');

var arr = _.range(10);

console.log('arr 1:', arr,  typeof [].clone);

var App = {
    _cards : null,
    setCards: (cards)=> {
        this._cards = cards;
        //this._cards = cards.clone();
    },
    pop:() => {
        this._cards.pop();   
    },
    shift:() => {
        this._cards.shift();   
    },
    push:(val) => {
        this._cards.push(val);   
    }
};


App.setCards(arr);

App.push('a');

console.log('arr 2:', arr);

App.shift();

console.log('arr 3:', arr);

//////////////////
// modules test //
//////////////////

var cardModel = require('./cardModel');

console.log(cardModel);

cardModel.change();