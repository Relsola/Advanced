// 数组解构赋值
var a = 1, b = 2
var [b, a] = [a, b]


// 对象解构赋值
let obj = {
    say: function () {
        console.log('say...');
    },
    fn: function () {
        console.log('fn...');
    },
    tn: function () {
        console.log('tn...');
    }
}
let { fn, tn: bn } = obj
fn();
bn();

// 函数参数的解构
// 如果你的参数是数组
// 那么你解构的模式就和数组解构一样
// 如果你的参数是对象
// 那么你结构的模式就和对象解构一样