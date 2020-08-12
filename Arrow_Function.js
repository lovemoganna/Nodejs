// arrow function demo1

let func = value =>  value;

console.log(func(1)); // 1

// demo2
let func2 = (value, num) => value*num;

console.log(func2(2, 3));

// demo3
let func3 = ({
  value, num
}) =>
({
  total: value * num
})


var result = func3({
  value: 3,
  num: 4
});

console.log(result.total)

