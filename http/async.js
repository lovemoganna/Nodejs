//<script src='a.js'></script>
//<script src='a.js'></script>
//<script src='a.js'></script>

//阻塞的情况
// var i =0
// while(true){
//   i++
//   console.log(i);
// }

//异步的行为
//每个任务都会有多个回调函数.

var c = 0
function printIt() {
  console.log(c);
}

function plus(callback) {
  //延迟加载,打印出0.和之前不一样.
  setTimeout(function() {
    c += 1
    callback()
  },1000)
}

plus(printIt)
