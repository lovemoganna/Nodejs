var pet = {
  words: 'xxx',
  speak: function (say) {
    console.log(say + ' ' + this.words);
  }
}
//pet.speak('你好')
//PS E:\Blog\Nodejs\http> node call_apply
//你好 xxx

//定义一个实例变量
var dog = {
  words: 'wangwang'
}
//把pet.speak中的this指向了dog,也就是dog拥有了pet中的speak的技能.
//call把dog对象指定为上下文.
pet.speak.call(dog,'hello')

//hello wangwang
