function Pet(words) {
  this.words = words
  this.speak = function() {
    console.log(this.words);
    console.log(this === dog);
  }
}

function Dog(words){
  //Pet.call(this,words)
  Pet.apply(this,arguments)
  //这两个效果一样
}

var dog = new Dog('wang wang ')

dog.speak()
