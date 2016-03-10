var fs = require('fs');

fs.writeFile('../tmp/write-test.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('文件写入成功');
});

var fileName = '../tmp/test.txt';

// // 同步读取
// var text = fs.readFileSync(fileName, "utf8");
// // 将文件按行拆成数组
// text.split(/\r?\n/).forEach(function (line) {
//   // ...
// });

// 创建文件夹, 不能 在不存在的文件夹中创建下一级目录
// var folder = '../tmp/helloDir';
// console.log(fs.exists(folder));
// if(!fs.exists(folder)){
//     fs.mkdir(folder,0777, function (err) {
//       if (err) throw err;
//       console.log('文件夹创建成功');
//     });
// }


fs.readFile(fileName, 'utf-8', function (err,rs) {
  if (err) throw err;
  console.log('test.txt rs1=> ',rs);
});


// 如果没有指定文件编码，返回的是原始的缓存二进制数据，这时需要调用buffer对象的toString方法，将其转为字符串。
fs.readFile(fileName, function (err,rs) {
  if (err) throw err;
  console.log('test.txt rs2=> ',rs);
  console.log('test.txt rs3=> ',rs.toString());
});


fs.readdir('../tmp',function(err,files){
  files.forEach( function (file) {
    fs.stat('../tmp/' + file, function (err, stats) {
          if (err) throw err;

          if (stats.isFile()) {
            console.log("%s is file", file);
          }
          else if (stats.isDirectory ()) {
          console.log("%s is a directory", file);
          }    
        //console.log('stats:  %s',JSON.stringify(stats));
    });
  });
});
