
var _ = require('underscore');

console.log('-----------一副扑克牌-------------');

var types = ['s','h','c','d']; // 黑桃, 红桃, 梅花, 方块
var nums = [3,4,5,6,7,8,9,10,11,12,13,14,15]; // 10 => J Q K A 2
var king = ['j16','j17']

var pai = [];
_.each(types,function(type){
    _.each(nums,function(num){
        pai.push(type + num);
    });
});
pai = pai.concat(king);
console.log('原始牌: ',JSON.stringify(pai)); 

pai = _.shuffle(pai); // 打乱

console.log('打乱顺序的牌: ',pai);

var users = ['Tom','Jason','Mary'];
var diPai = []; // 三张
var shoupaiNum = 17; // 斗地主17张手牌
var usersPais = {};
// 发牌
_.each(users,function(userName){
    usersPais[userName] = pai.splice(0,shoupaiNum);  // 获取指定张数的牌,并删除该数组中对应的元素

});

console.log('用户手牌: ',usersPais);
console.log('剩余底牌: ',pai);