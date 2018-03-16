// var pet ={
//   word: 'i am not talking',
//   speak: function () {
//     console.log(this.word)
//     console.log(this === pet)
//   }
// }
//
// pet.speak()
// PS E:\Blog\Nodejs\http> node context
// i am not talking
// true

// function pet(words){
//   this.words = words
//   console.log(this.words)
//   console.log(this === global)
// }
//
// pet('...')


function Pet(words) {
  this.words = words

  this.speak = function () {
    console.log(this.words);
    console.log(this === pet);
  }
}

var pet=new Pet('wangwang')
pet.speak()

// 测试结果:
// PS E:\Blog\Nodejs\http> node context
// wangwang
// true
