// 解构的用途


//（1）交换变量的值
let x = 111, y = 222;
console.log(`交换前: x=${x}, y=${y}`);
[x, y] = [y, x];
console.log(`交换后: x=${x}, y=${y}`);

console.log('=====================================');

// （2）从函数返回多个值
// 返回一个数组

function example1() {
  return [1, 2, 3];
}
var [a, b, c] = example1();

// 返回一个对象

function example2() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example2();
console.log('=====================================');

//（3）函数参数的定义: 解构赋值可以方便地将一组参数与变量名对应起来。

// 参数是一组有次序的值
function f1([x, y, z]) { console.log(x,y,z); }
f1([1, 2, 3]);

// 参数是一组无次序的值
function f2({x, y, z}) { console.log(x,y,z); }
f2({z: 3, y: 2, x: 1});

console.log('=====================================');

//（4）提取JSON数据
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
console.log('=====================================');


//（5）函数参数的默认值
jQuery =  {};
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
console.log('=====================================');


//（6）遍历Map结构: 任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit", "Trident"]);
for (let e of engines) {
  console.log(e);
}
console.log('=====================================');

// 块级作用域
function test() {
  let n = 5;
  if (true) {
	  let n = 10;
	  console.log('n: ', n);
  }
  console.log(n); // 5
}
test();
