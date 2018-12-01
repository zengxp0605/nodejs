
var startTime = Date.now();
var count = 0;

//耗时任务
// setInterval(function () {
//     var i = 0;
//     while (i++ < 100000000);
// }, 0);

var intervalTime = 1000;
setInterval(function () {
    count++;
    console.log(`Count: ${count}`, ' Delay: ', Date.now() - (startTime + count * intervalTime));
}, intervalTime);