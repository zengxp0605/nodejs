
//2 泛型类
class GetMin<T>{
    arr: T[] = [];
    add(item: T) {
        this.arr.push(item);
    }
    min(): T {
        var min = this.arr[0];
        this.arr.forEach(function (value) {
            if (value < min) {
                min = value;
            }
        });
        return min;
    }
}
var gm1 = new GetMin<number>();
gm1.add(5);
gm1.add(3);
gm1.add(2);
gm1.add(9);
console.log(gm1.min());

var gm2 = new GetMin<string>();
gm2.add("tom");
gm2.add("jerry");
gm2.add("jack");
gm2.add("sunny");
console.log(gm2.min());

