var http = require('https'); //使用https模块
var fs = require('fs');//文件读写
var cheerio = require('cheerio');//jquery写法获取所得页面dom元素
var request = require('request');//发送request请求
var i = 0;
var url = "https://movie.douban.com/subject/1889243/?from=subject-page";
//初始url
function fetchPage(x) { //封装一层函数,方便递归调用
    startRequest(x);
}

function startRequest(x) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function(res) { //get到x网址，成功执行回调函数
        var html = ''; //用来存储请求网页的整个html内容
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function(chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function() {
            var $ = cheerio.load(html); //采用cheerio模块解析html
            var news_item = {
                //获取电影的标题
                title: $('.related-info h2 i').text().trim(),
                //i是用来判断获取页数
                i: i = i + 1,

            };

            console.log(news_item); //打印新闻信息
            var news_title = $('.related-info h2 i').text().trim();

            savedContent($, news_title); //存储每篇文章的内容及文章标题

            savedImg($, news_title); //存储每篇文章的图片及图片标题

            //下一篇电影的url
            nextLink = $(".recommendations-bd dl:last-child dd a").attr('href');
            if(i <= 10) { //爬取10页
                fetchPage(nextLink);
            }
        });

    }).on('error', function(err) { //http模块的on data,on end ,on error事件
        console.log(err);
    });

}
//存储标题函数
function savedContent($, news_title) {
    $('#link-report span').each(function(index, item) {
        var x = $(this).text();
        x = x + '\n';
        //将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
        fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function(err) {
            if(err) {
                console.log(err);
            }
        });
    })
}
//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($, news_title) {
    $('#mainpic img').each(function(index, item) {
        var img_title = $('#content h1 span').text().trim(); //获取图片的标题
        if(img_title.length > 35 || img_title == "") { //图片标题太长
            img_title = "Null";
        }
        var img_filename = img_title + '.jpg';
        var img_src = $(this).attr('src'); //获取图片的url

        //采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src, function(err, res, body) {
            if(err) {
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/' + news_title + '---' + img_filename));
        //通过流的方式，把图片写到本地/image目录下，并用标题和图片的标题作为图片的名称。
    })
}
fetchPage(url); //主程序开始运行
