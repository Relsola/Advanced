{
  /* 
    对JS的理解
      动态类型语言：代码在执行过程中，才知道这个变量属于的类型。
      弱类型：数据类型不固定，可以随时改变。
      解释型：一边执行，一边编译，不需要程序在运行之前需要整体先编译。
      基于对象：最终所有对象都指向Object。
      脚本语言：一般都是可以嵌在其它编程语言当中执行。
      单线程：依次执行，前面代码执行完后面才执行。

  ECMAscript	                DOM	                      BOM  
  JavaScript的语法部分  	    文档对象模型	           浏览器对象模型
  主要包含JavaScript语言语法  主要用来操作页面元素和样式 主要用来操作浏览器相关功能
  */
}


{
  // JS数据类型有哪些？值是如何存储的？
  // 基本数据类型:
  Number
  String
  Boolean
  undefined
  null
  Symbol // ES6新增，表示独一无二的值
  BigInt // ES6新增，以n结尾，表示超长数据

  // 对象：
  Object
  Function
  Array
  Date
  RegExp
  Error

  /* 
    基本数据类型值是不可变的，多次赋值，只取最后一个。
    基本数据类型存储在栈中，占据空间小
    引用数据类型存储在堆中。引用数据类型占据空间大
    引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
  */
}


{
  /* 
    4. Null、undefined、undeclared 的 区别
       null表示空的，什么都没有，不存在的对象，他的数据类型是object。 初始值赋值为null，表示将要赋值为对象， 不再使用的值设为null，浏览器会自动回收。
       
       undefined表示未定义，常见的为undefined情况： 一是变量声明未赋值， 二是数组声明未赋值； 三是函数执行但没有明确的返回值； 四是获取一个对象上不存在的属性或方法。
         变量声明未赋值，是 undefined。
         未声明的变量，是 undeclared。浏览器会报错a is not defined ，ReferenceError。
  */
  null, undefined
}


{
  /* 
    JS数据类型转换 JS的显式数据类型转换一共有三种
      转字符串：.toString() String() 
      Sting()函数相可以将null和undefined转化为字符串，toString()转化会报错。

      转数值：Number() parseInt()  parseFloat()
      Number()函数  字符串合法数字则转化成数字 不合法则转化为NAN 
                    空串转化为0  null和undefined转0和NAN true转1 false转0
      parseInt()是从左向右获取一个字符串的合法整数位
      parseFloat()获取字符串的所有合法小数位

      转布尔：像false、0、空串、null、undefined和NaN这6种会转化为false
      

     常用的隐式类型转换有：任意值+空串转字符串、+a转数值、a-0 转数值等。
  */
  String(), toString()
  Number(), parseInt(), parseFloat()
  Boolean()
  0 + "", +"10", !!null
}


{
  // 数据类型的判断
  // 1. typeof的返回值有八种，返回值是字符串，不能判断数组和null的数据类型，返回object。
  typeof ''; // string
  typeof 1; // number
  typeof true; // boolean
  typeof undefined; // undefined
  typeof Symbol(); // bigint
  typeof 1n; // symbol
  typeof new Function(); // function

  typeof null; //object 无效   这个是一个设计缺陷，造成的
  typeof []; //object 无效


  // 2.  instanceof  检查对象原型链上有没有该构造函数，可以精准判断引用数据类型
  ({}) instanceof Object; //true
  new Date() instanceof Date; //true
  new RegExp() instanceof RegExp; //true
  new Error() instanceof Error; //true

  [] instanceof Array;  //true
  [] instanceof Object;  //true

  (() => { }) instanceof Function; // true
  (() => { }) instanceof Object; // true


  // 3. constructor 访问它的构造函数。既可以检测基本类型又可以检测对象，但不能检测null和undefined
  // 注意函数的 constructor 是不稳定，如果把函数的原型进行重写，这样检测出来的结果会不准确
  (10).constructor === Number; // true
  [].constructor === Array; // true
  (new RegExp).constructor === RegExp; // true
  (new RegExp).constructor === Object; // false

  function Fn() { };
  Fn.prototype = new Array();
  (new Fn).constructor; // [Function: Array]
  (() => { }).constructor; // [Function: Function]


  // 4. 最准确方式 —— Object.prototype.toString.call()
  /*
    获取Object原型上的toString方法，让方法执行
    让toString方法中的this指向第一个参数的值，最准确方式。
    
    第一个object：当前实例是对象数据类型的(object)
    第二个Object：数据类型。
  */
  Object.prototype.toString.call('');   // [object String]
  Object.prototype.toString.call(1);    // [object Number]
  Object.prototype.toString.call(true); // [object Boolean]
  Object.prototype.toString.call(undefined); // [object Undefined]
  Object.prototype.toString.call(null); // [object Null]
  Object.prototype.toString.call(new Function()); // [object Function]
  Object.prototype.toString.call(new Date()); // [object Date]
  Object.prototype.toString.call([]); // [object Array]
  Object.prototype.toString.call(new RegExp()); // [object RegExp]
  Object.prototype.toString.call(new Error()); // [object Error]
}


{
  // 0.1+0.2 === 0.3吗
  console.log(0.1 + 0.2 === 0.3); // false
  console.log((0.1 + 0.2).toFixed(2)); // 0.30  toFixed为四舍五入
  /*
    计算机是通过二进制的方式存储数据的
    所以计算机计算0.1+0.2的时候，实际上是计算的两个数的二进制的和
    0.1的二进制是0.0001100110011001100...（1100循环）
    0.2的二进制是：0.00110011001100...（1100循环）

    这两个数的二进制都是无限循环的数,那JavaScript是如何处理无限循环的二进制小数呢？
    一般我们认为数字包括整数和小数
    但是在 JavaScript 中只有一种数字类型：Number
    它的实现遵循IEEE 754标准，使用64位固定长度来表示，也就是标准的double双精度浮点数
    在二进制科学表示法中，双精度浮点数的小数部分最多只能保留52位
    再加上前面的1，其实就是保留53位有效数字，剩余的需要舍去，遵从“0舍1入”的原则
    根据这个原则，0.1和0.2的二进制数相加，再转化为十进制数就是：0.30000000000000004。
  */
}


{
  // JS的作用域和作用域链
  /*
    作用域就是变量起作用的范围和区域  作用域的目的是隔离变量，保证不同作用域下同名变量不会冲突

    JS中，作用域分为三种，全局作用域、函数作用域和块级作用域。 
      全局作用域在script标签对中，无论在哪都能访问到。
      在函数内部定义的变量，拥有函数作用域。
      块级作用域则是使用let和const声明的变量，如果被一个大括号括住，那么这个大括号括住的变量区域就形成了一个块级作用域。

    作用域层层嵌套，形成的关系叫做作用域链，
    作用域链也就是查找变量的过程: 查找变量的过程：当前作用域 ->上一级作用域 ->上一级作用域 .... ->直到找到全局作用域 ->还没有，则会报错。
    
    作用域链是用来保证——变量和函数在执行环境中有序访问。
  */


  // LHS和RHS查询
  /*
    LHS和RHS查询是JS引擎查找变量的两种方式
    这里的“Left”和“Right”，是相对于赋值操作来说
      当变量出现在赋值操作左侧时，执行LHS操作 意味着变量赋值或写入内存，,他强调是写入这个动作。
        let name = '小明';
      当变量出现在赋值操作右侧或没有赋值操作时，是RHS。
        let myName = name;
  */


  //  词法作用域和动态作用域
  /*
    Js底层遵循的是词法作用域，从语言的层面来说，作用域模型分两种：
      词法作用域：也称静态作用域，是最为普遍的一种作用域模型
      动态作用域：相对“冷门”，bash脚本、Perl等语言采纳的是动态作用域
      
      词法作用域：在代码书写时完成划分，作用域沿着它定义的位置往外延伸。
      动态作用域：在代码运行时完成划分，作用域链沿着他的调用栈往外延伸。
  */
}


{
  // Js的事件轮询
  /*
    JS是单线程运行，同一时间只能干一件事情
    异步要基于回调实现。事件轮询就是异步回调实现的原理。
    
    首先来说JS从前到后一行一行执行，当遇到代码报错，后面的代码将不再执行
    先把同步代码执行完，在执行异步。
    
    event loop过程：
      1. 同步代码，一行一行放入调用栈中执行。
      2. 遇到异步，先记录下来，等待时机。（例如计时器放入到web APIs里）。
      3. 时机到了就会移动到callback Queue中。
      4. 同步代码执行完（call stack为空），event loop开始工作。
      5. event loop 轮训查找callback queue,如果有则移动到call stack执行。如果没有，继续轮训查找。（像永动机一样）。
  */


  // 宏任务 微任务
  /*
    宏任务：script ajax请求、计时器、DOM事件 postMessage、MessageChannel
    微任务：promise/async await MutationObserver  process.nextTick（Node.js）
    微任务执行时机比宏任务早
  */

  // 事件轮询和DOM渲染问题
  /*
    JS是单线程的，而且和DOM渲染公用一个线程，JS执行的时候，得留一些时机供DOM渲染。
      1. 每次调用栈清空，同步任务执行完
      3. 都是DOM重新渲染的机会，DOM结构如有改变则重新渲染
      4. 然后去触发下一次event loop

    为什么微任务比宏任务执行更早
      1. 微任务：dom渲染前触发
      2. 宏任务：dom渲染后触发
  */
}