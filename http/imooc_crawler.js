var http = require('http')

var url = 'http://lol.qq.com'

http.get(url,function(res) {
var html= ''
res.on('data',function(data) {
  html += data
})
res.on('end',function() {
  console.log(html);
})
//注册一个error时间,如果超时可以捕捉错误
}).on('error',function() {
console.log('获取数据出错!');
})
