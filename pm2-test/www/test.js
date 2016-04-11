
var fs =require('fs');

var Q = require('q');

function aa() {
    return Q(1);
}


Q.when(aa(), function(a){
    console.log(a);
});


var data = {
    test:'test'
};
openAndWriteToSystemLog(new Buffer(JSON.stringify(data)),function(){});

function openAndWriteToSystemLog(writeBuffer, callback){
    fs.open('d:/my_file.txt', 'a', function opened(err, fd) {
        if (err) { return callback(err); }
        function notifyError(err) {
            fs.close(fd, function() {
                callback(err);
            });
        }
        var bufferOffset = 0,
        bufferLength = writeBuffer.length,
        filePosition = null;
        fs.write( fd, writeBuffer, bufferOffset, bufferLength, filePosition,
            function wrote(err, written) {
                if (err) { return notifyError(err); }
                fs.close(fd, function() {
                    callback(err);
                });
            }
        );
    });
}