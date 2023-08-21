/* 
    1. var 声明的变量预编译阶段会提升，不加var的不会提升
    2. 不管加不加var 全局变量都会挂载到GO上，也就是window/global上
    3. 加var的既可以是全局变量，也可以是局部变量 不加var的是全局变量（第一次出现）
    4. 局部变量不会挂载到GO上
    5. 你在使用var的时候，声明提升到了最前面并且初始化值为undefined


let 声明变量，在全局let就是全局变量，在局部let就是局部的
    1. 不会初始化（提升分两个阶段  1.把声明提升到代码的最前面 2.对变量的初始化）
    2. let和{}会形成块级作用域（块级作用域是ES6提出的概念）
    3. 使用let 声明的全局变量不会挂载到GO上
    4. 使用let不能重复使用声明


使用const声明的是常量
    1. 使用const声明的量不能修改(栈空间)
    2. 使用const声明的量不会提升（实际上是不会初始化）
    3. 使用const声明的量必须赋值
    4. 使用const 和{}也会形成块级作用域(暂存性死区)
    5. const声明的量也不会挂载到GO上
*/

// in运算符就是看一个属性是否属于某个对象
console.log("name" in global); // false


/* 
    if和function连用的时候
      1.function只会把声明提升到最外面
      2.当你进入到if后，做的第一件事就是给fn赋函数体 
*/
console.log(fn); // undefined
if (true) {
    fn() // fn...
    function fn() { console.log('fn...') }
}
console.log(fn); // Function



/* 
    立即执行函数：
        第一种 (function(){})()
        第二种 ;(function (){})()
        第三种 ;(function (){}())
        第四种 +function (){}()
        第五种 -function (){}()
        第六种 !function (){}()
*/



const obj = {
    name: '张三',
    stu: {
        names: 'one'
    }
}
let newname;
with (obj.stu) {
    newname = names
}
console.log(newname);
/* 
    with破化了作用域链
    with作用是 扩大了放入数据的作用域
    当with传入的值非常复杂的时候 即使obj他是非常复杂的嵌套结果，with也会让代码看起来简洁
*/