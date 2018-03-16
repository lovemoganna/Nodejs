var klass = require('./klass')

//klass.add('Scott',['小明','小红']

exports.add = function (klasses){
  //进入klass对象内部
  klasses.forEach(function(item,index){
    //对象内部的东西,就是老师姓名和学生数组
      var _klass = item
      //老师姓名
      var teacherName = item.teacherName
      //学生数组
      var students =item.students

      klass.add(teacherName,students)
    })

}
