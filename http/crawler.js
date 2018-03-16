var http = require('https')
var cherrio =require('cherrio')

var url = 'https://www.imooc.com/learn/708?mc_marking=1b8ef88417de6e77b132983677c2af07&mc_channel=syb48'

//过滤函数
function filterChapters(html) {
  var $ = cherrio.load(html)
  //拿到里面的每一章
  var chapters = $('.learnchapter')

// [{
//   chapterTitle: '',
//   videos:[
//       title: '',
//       id: ''
//   ]
// }]

    var courseData = []
    //遍历每一章
    charters.each(function(){
      //拿到单独的一章
      var chapter = $(this)
      //拿出章的标签里面的文本内容
      var chapterTitle = chapter.find('strong').text()
      //拿出里面的小节
      chapter.find('.video').children('li')
      var chapterData = {
        chapterTitle: chapterTitle,
        videos: []
      }
      //对videos进行遍历
      videos.each(function(item){
        var video = $(this).find('.studyvideo')
        var videoTitle = video.text()
        var id =video.attr('href').split('video/')[1]
        chapterData.videos.push({
          title: videoTitle,
          id: id
        })
      })
      courseData.push(chapterData)
    })
    return courseData
}

function printCourseInfo(courseData) {
  courseData.forEach(function(item) {
    var chapterTitle = item.chapterTitle

    console.log(chapterTitle + "\n");
    item.videos.forEach(function(video){
      console.log('['+video.id+']'+ video.title+ '\n');
    })
  })
}

http.get(url,function(res) {
  var html= ''
  res.on('data',function(data) {
    html += data
  })
  res.on('end',function() {
  var courseData = filterChapters(html)
  printCourseInfo()
  })
  //注册一个error时间,如果超时可以捕捉错误
}).on('error',function() {
  console.log('获取数据出错!');
})
