
var __CASE__ = 3;

///////////////////////////////////////////
//      Transfer-Encoding=chunked        //
///////////////////////////////////////////
if(__CASE__ == 1){
    var http = require('http');
    http.createServer(function (request, response){
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('hello');
      response.write(' world ');
      response.write('~ ');
      response.end();
    }).listen(5000, "127.0.0.1");
} 



///////////////////
//   简单思路        //
///////////////////
if(__CASE__ == 2){
    var http = require('http');
    var fs = require('fs');

    http.createServer(function(request, response) {
      response.writeHead(200, { 'Content-Type': 'text/html' });

      // flush layout and assets
      var layoutHtml = fs.readFileSync(__dirname + "/html/layout.html").toString();
      response.write(layoutHtml);

      // fetch data and render
      response.write('<script>renderFlushCon("#A","moduleA");</script>');
      response.write('<script>renderFlushCon("#C","moduleC");</script>');
      response.write('<script>renderFlushCon("#B","moduleB");</script>');

      // close body and html tags
      response.write('</body></html>');
      // finish the response
      response.end();
    }).listen(5000, "127.0.0.1");

}

///////////////////////////////
//          异步分块加载           //
///////////////////////////////

if(__CASE__ = 3){
    var http = require('http');
    var fs = require('fs');
    var async = require('async');

    http.createServer(function(request, response) {
      response.writeHead(200, { 'Content-Type': 'text/html' });

      // flush layout and assets
      var layoutHtml = fs.readFileSync(__dirname + "/html/layout.html").toString();
      response.write(layoutHtml);

        var options = [
            {id:"A",html:"moduleA",delay:1000},
            {id:"B",html:"moduleB",delay:0},
            {id:"C",html:"moduleC",delay:2000}
        ];

        async.forEach(options, function(item, callback) { 
            setTimeout(function(){
                response.write('<script>renderFlushCon("#'+item.id+'","'+item.html+'");</script>');
                callback();
            }, item.delay);

        }, function(err) { 
              // close body and html tags
              response.write('</body></html>');
              // finish the response
              response.end();
        });

    
    }).listen(5000, "127.0.0.1");
}