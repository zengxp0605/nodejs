// a trivial process that does nothing except
// trigger GC and output the present base memory
// usage every second.  this example is intended to
// demonstrate that memwatch itself does not leak.

var memwatch = require('memwatch-next');

memwatch.on('gc', function (d) {
    if (d.compacted) {
        console.log('current base memory usage:', memwatch.stats().current_base);
    } else {
        console.log(memwatch.stats());
    }
});

setInterval(function () {
    console.log('start.');
    memwatch.gc();
}, 2000);