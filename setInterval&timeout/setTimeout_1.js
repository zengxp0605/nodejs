var startTime = new Date().getTime();
var count = 0;
// setInterval(function () {
//     let stime = Date.now();
//     var i = 0;
//     while (i++ < 10000000);

//     console.log('耗时: ', Date.now() - stime);
// }, 0);


/**
 * 任务耗时大概 20ms
 */
function task() {
    // return;
    let stime = Date.now();
    let i = 0;
    while (i++ < 20000000);

    // console.log('耗时: ', Date.now() - stime);
}

const intervalTime = 50;
function fixed() {
    task();

    count++;
    let nextInterval = startTime + (count * intervalTime) - Date.now();
    // if (nextInterval < 0) nextInterval = 0;
    console.log(Date.now() - (startTime + (count - 1) * intervalTime), nextInterval);

    setTimeout(fixed, nextInterval);

}
fixed();


// 其他耗时任务
setInterval(() => {
    task();
    task();
    task();
}, 200);
