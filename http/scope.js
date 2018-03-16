var globalVariable = 'This is a global variable'
//此函数,可以在全局域被调用
function  globalFunction(){
  //声明一个局部变量
  //内部所在就是一个局部作用域,可以访问外面的函数和变量
  var localVariable = 'this is local variable'
  console.log('Visit global/local variable')
  console.log(globalVariable)
  console.log(localVariable)

  //局部作用域里面引入全局变量
  globalVariable = "this is a change globalVariable"
  console.log(globalVariable);

  //在局部作用域里面声明一个函数
  function localFunction() {
    var innnerVariable = 'this is inner local variable'
    console.log("局部作用与内部"+innnerVariable);
    //他可以访问到全局作用域的变量的
    console.log("局部作用域内部"+globalVariable)
    console.log("局部作用域内部"+localVariable)

  }
  //仅仅可以在局部作用域里面调用
  localFunction()
}
//调用这个函数
globalFunction()

// 在调用globalFunction()的时候,会进入函数体内部,函数体内部就是一个局部作用域.
// 他们就可以访问到globalFunction()这个函数体以外的全局变量和函数.

// 在globalFunction()里面再声明一个localFunction()函数体,他就处于局部作用域内,里面的变量是可以相互访问的,
// 同时他也可以访问到globalFunction()里面的变量,甚至函数.同时也可以访问全局的变量甚至函数.
