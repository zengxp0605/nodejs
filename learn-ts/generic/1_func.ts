/*
 * ts中泛型
 *    泛型就是在编译期间不确定方法的类型(广泛之意思)，在方法调用时，由程序员指定泛型具体指向什么类型
 */

//1 泛型函数

/**
 * 获取数组中最小值 （数字）
 * @param {number[]} arr
 * @returns {number}
 */
function getMinNumber(arr: number[]): number {
    var min = arr[0];
    arr.forEach((value) => {
        if (value < min) {
            min = value;
        }
    });
    return min;
}

/**
 * 获取数组中最小值 （字符串）
 * @param {number[]} arr
 * @returns {number}
 */
function getMinStr(arr: string[]): string {
    var min = arr[0];
    arr.forEach((value) => {
        if (value < min) {
            min = value;
        }
    });
    return min;
}

console.log(getMinNumber([1, 3, 5, 7, 8]));//1
console.log(getMinStr(["tom", "jerry", "jack", "sunny"]));//jack

/**
 * 获取数组中最小值 (T泛型通用)
 * @param {T[]} arr
 * @returns {T}
 */
function getMin<T>(arr: T[]): T {
    var min = arr[0];
    arr.forEach((value) => {
        if (value < min) {
            min = value;
        }
    });
    return min;
}

console.log(getMin([1, 3, 5, 7, 8]));
console.log(getMin(["tom", "jerry", "jack", "sunny"]));

