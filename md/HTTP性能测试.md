## HTTP性能测试

[搭建Apache服务器,自己Google]()
[注册和删除Apache服务器](https://jingyan.baidu.com/article/e52e361543eaee40c60c510c.html)
[搭建Apache遇到的问题](http://blog.csdn.net/mengwuyoulin/article/details/50877119)

查看端口占用的命令
```
netstat -tulnp|grep 443 linux查看端口占用

netstat -aon|findstr "443"  windows查看端口占用
```

测试nginx服务性能

`ab -n1000 -c10 http://localhost:2018/`

其中-n代表请求数，-c代表并发数
```

D:\Apache24\bin>ab -n1000 -c10 http://localhost:2018/
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests

//web服务器
Server Software:
Server Hostname:        localhost
Server Port:            2018

Document Path:          /
//响应数据的长度
Document Length:        13 bytes
//并发数
Concurrency Level:      10
//所有请求所要花费的时间
Time taken for tests:   1.705 seconds
//完成的请求数量
Complete requests:      1000
//失败的请求数
Failed requests:        0
//所有请求参数数量的总和:HTTP响应的头信息和正文数据的长度
Total transferred:      114000 bytes
//HTML的参数量
HTML transferred:       13000 bytes
//服务器的吞吐率:每秒的事务数
Requests per second:    586.48 [#/sec] (mean)
//表示用户平均请求的等待时间.(平均事务的响应时间)
Time per request:       17.051 [ms] (mean)
//表示每个连接请求实际运行时间的平均值
Time per request:       1.705 [ms] (mean, across all concurrent requests)
表示这些请求在单位时间内网络上的流量.排除是否网络流量过大,而导致的响应时间延迟的问题.
Transfer rate:          65.29 [Kbytes/sec] received
//网络上消耗时间的分析.
Connection Times (ms)
             min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       1
Processing:     9   16  26.1     12     270
Waiting:        8   16  26.0     12     269
Total:          9   17  26.1     13     270
//数据请求处理分布情况
Percentage of the requests served within a certain time (ms)
//50%的用户请求时间小于13ms
 50%     13
 66%     14
 75%     15
 80%     16
 90%     17
 95%     23
 98%     82
 99%    210
100%    270 (longest request)

D:\Apache24\bin>kk
```
这个也跟电脑配置有关.

测试我的博客`http://luoyupiaoshang.club/`

```
Server Software:        GitHub.com
Server Hostname:        luoyupiaoshang.club
Server Port:            80

Document Path:          /
Document Length:        54093 bytes

Concurrency Level:      2
Time taken for tests:   63.642 seconds
Complete requests:      17
Failed requests:        0
Total transferred:      929742 bytes
HTML transferred:       922024 bytes
//服务器的吞吐量
Requests per second:    0.27 [#/sec] (mean)
Time per request:       7487.252 [ms] (mean)
Time per request:       3743.626 [ms] (mean, across all concurrent requests)
Transfer rate:          14.27 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:      346  501 422.1    352    1783
Processing:  1425 5290 4499.9   3901   14774
Waiting:      345  545 471.3    359    1777
Total:       1771 5791 4545.0   4259   15137

Percentage of the requests served within a certain time (ms)
  50%   3838
  66%   5763
  75%   6321
  80%  10689
  90%  15002
  95%  15137
  98%  15137
  99%  15137
 100%  15137 (longest request)
```
