//引入http这个模块
var http =require('http')

http
  .createServer(function(req,res) {
    //返回响应头
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('Hello Nodejs!')
    res.end()
  })
  .listen(2018)//监听这端口
