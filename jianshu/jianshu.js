//引入第三方模块，superagent用于http请求，cheerio用于解析DOM
const request = require('superagent');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

//目标链接 博客园首页
let targetUrl = 'https://www.jianshu.com/';

let content = '';
let imgs = [];

//发起请求
request.get(targetUrl)
       .end( (error,res) => {
           if(error){
               console.log(error)
               return;
           }
           let $ = cheerio.load(res.text);
           //抓取需要的数据
           $('#list-container .note-list li').each( (index,element) => {
                let temp = {
                    '用户ID' : $(element).attr('data-note-id'),
                    '作者' : $(element).find('.info > a.nickname').text(),
                    '标题' : $(element).find('.title').text(),
                    //'预览' : $(element).find('.abstract').text(),
                    '发布时间' : $(element).find('.time').attr('data-shared-at'),
                    '标签' : $(element).find('.collection-tag').text(),
                    '关注数' :  +$(element).find('.ic-list-comments').parent().text(),
                    '阅读数' : +$(element).find('.ic-list-read').parent().text(),
                    '打赏金额' : +($(element).find('.ic-list-money').parent().text()) * 1//JS规范
                }
                content += JSON.stringify(temp)+"\n";
                //图片地址
                if($(element).find('.avatar img').length > 0){
                    imgs.push($(element).find('.avatar img').attr('src'));
                }
           });
           mkdir('./content',saveContent);
           mkdir('./imgs',downloadImg);
       })
//创建目录
function mkdir(_path,callback){
    if(fs.existsSync(_path)){
        console.log(`${_path}目录已存在`)
    }else{
        fs.mkdir(_path,(error)=>{
            if(error){
                return console.log(`创建${_path}目录失败`);
            }
            console.log(`创建${_path}目录成功`)
        })
    }
    callback();
}
//将文字内容存入txt文件中
function saveContent() {
    fs.writeFile('./content/content.txt',content.toString());
}
//下载爬到的图片
function downloadImg() {
    imgs.forEach((imgUrl,index) => {
        //获取图片名
        let imgName = imgUrl.split('/').pop();

        //下载图片存放到指定目录
        let stream = fs.createWriteStream(`./imgs/${imgName}`);
        let req = request.get('https:' + imgUrl);
        req.pipe(stream);
        console.log(`开始下载图片 https:${imgUrl} --> ./imgs/${imgName}`);
    } )
}
