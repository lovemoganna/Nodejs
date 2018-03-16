function clickIt(e) {
  window.alert('button is clicked!')
}

var button = document.getElementById('button')
//拿到单击事件,并添加一个事件监听
button.addEventListener('click',clickIt)

//EventEmitter 为某个事件注册的回调函数,但是这个回调函数不是马上执行,只有事件发生的时候,才可以调用回调函数,这种函数执行的方式叫做事件驱动
//注册事件就是基于事件驱动的回调.
