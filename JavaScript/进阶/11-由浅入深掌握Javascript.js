{
    // 函数
    {
        /* 
          匿名函数 也叫一次性函数，没有名字
          在定义时执行，且执行一次，不存在预解析（函数内部执行的时候会发生）。
          
          匿名函数的作用有：
            1. 对项目的初始化，页面加载时调用，保证页面有效的写入Js，不会造成全局变量污染
            2. 防止外部命名空间污染
            3. 隐藏内部代码暴露接口
        */
        (function () { }());

        (function () { })();

        //  使用多种运算符开头，一般是用!
        !function () { }();
    }

    {
        /* 
          回调函数  一段可执行的代码段
          它作为一个参数传递给其他的代码，其作用是在需要的调用这段回调函数
        */

        // 例 点击事件的回调函数  异步请求的回调函数 计时器
        setTimeout(function () {
            console.log('hello')
        }, 1000)
    }


    {
        /* 
          构造函数
            在ES6之前，我们都是通过构造函数创建类，从而生成对象实例
            构造函数就是一个函数，只不过通常我们把构造函数的名字写成大驼峰
            构造函数通过new关键字进行调用，普通函数直接调用。
        */
        // 创建一个类（函数）
        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.eat = function () {
                console.log('我爱吃');
            }
        }
        // 普通函数调用
        const result = Person('张三', 18);
        console.log(result);

        // 构造函数调用            
        const p = new Person('李四', 16);
        console.log(p);
    }

    {
        /* 
          函数中arguments 的对象
            函数在调用时JS引擎会向函数中传递两个的隐含参数
            一个是this，另一个是arguments
            arguments是一个伪数组，用于获取函数中在调用时传入的实参。
        */
        function add() {
            console.log(Array.isArray(arguments));
        }
    }
}


{
    // 字符串
    {
        /* 
          列举常用字符串方法:
          charAt()	返回指定索引的字符

          charCodeAt()	返回指定索引的字符编码

          concat()	将原字符串和指定字符串拼接，不指定相当于复制一个字符串

          String.fromCharCode()	返回指定编码的字符

          indexOf()	查询并返回指定子串的索引，不存在返回-1

          lastIndexOf()	反向查询并返回指定子串的索引，不存在返回-1

          localeCompare()	比较原串和指定字符串：原串大返回1,原串小返回-1，相等返回0

          slice()	截取指定位置的字符串，并返回。包含起始位置但是不包含结束位置，位置可以是负数

          substr()	截取指定起始位置固定长度的字符串

          substring()	截取指定位置的字符串，类似slice。起始位置和结束位置可以互换并且不能是负数

          split()	将字符串切割转化为数组返回

          toLowerCase()	将字符串转化为小写

          toUpperCase()	将字符串转化为大写

          valueOf()	返回字符串包装对象的原始值

          toString()	直接转为字符串并返回

          includes()	判断是否包含指定的字符串

          startsWith()	 判断是否以指定字符串开头

          endsWith()	判断是否以指定字符串结尾

          repeat()	重复指定次数
        */
    }
}


{
    // 数组
    {
        /* 
           列举常用数组方法：
           concat()	合并数组，并返回合并之后的数据

           join()	使用分隔符，将数组转为字符串并返回

           pop()	删除最后一位，并返回删除的数据，在原数组

           shift()	删除第一位，并返回删除的数据，在原数组

           unshift()	在第一位新增一或多个数据，返回长度，在原数组

           push()	在最后一位新增一或多个数据，返回长度

           reverse()	反转数组，返回结果，在原数组

           slice()	截取指定位置的数组，并返回

           sort()	排序（字符规则），返回结果，在原数组

           splice()	删除指定位置，并替换，返回删除的数据

           toString()	直接转为字符串，并返回

           valueOf()	返回数组对象的原始值

           indexOf()	查询并返回数据的索引

           lastIndexOf()	反向查询并返回数据的索引

           forEach()	参数为回调函数，会遍历数组所有的项，回调函数接受三个参数，分别为value，index，self；forEach没有返回值

           map()	同forEach，同时回调函数返回数据，组成新数组由map返回

           filter()	同forEach，同时回调函数返回布尔值，为true的数据组成新数组由filter返回

           Array.from()	将伪数组对象或可遍历对象转换为真数组

           Array.of()	将一系列值转换成数组

           find	找出第一个满足条件返回true的元素

           findIndex	找出第一个满足条件返回true的元素下标
        */
    }
}


{
    // 对象
    {
        /* 
          对象常用方法:
          Object.assign()  浅拷贝

          Object.create()  需要传入一个参数，作为新建对象的原型对象

          Object.is()  判断两个值是否相等

          Object.keys() 获取给定对象的自身可枚举属性的属性名（键）

          Object.values() 获取给定对象的自身可枚举属性的属性值（值）

          Object.entries() 返回键值对数组

          Object.fromEntries()  将键值对数组转换为对象
          
          Object.defineProperty() 给对象定义新属性、修改现有属性
          Object.defineProperties() 可一次性处理多个属性

          Object.proxy() Proxy是一个构造函数，用它来代理某些操作

          Object.getOwnPropertyDescription() 获取对象上的一个自有属性的属性描述
          Object.getOwnPropertyDescriptors() 获取对象的所有自身属性的描述符

          Object.getOwnPropertyNames() 获取对象自身拥有的可枚举属性和不可枚举属性的属性名，返回一个数组

          Object.prototype.hasOwnProperty() 判断对象自身属性是否含有指定的属性，不包括从原型链上继承的属性

          Object.getPrototypeOf()  返回指定对象的原型，如果没有则返回null

          Object.setPrototypeOf() 设置指定对象的新原型

          Object.prototype.isPrototypeOf() 检测一个对象是否存在于另一个对象的原型链上

          Object.toString() 每个对象都有这个方法，用于返回一个表示该对象的字符串，不同类型的数据都重写了toString方法，因此返回的值不一样

          Object.toLocaleString() 将对象根据语言环境来转换字符串
        */
    }
}

{
    // Math常用方法
    Math.abs(); // 绝对值

    Math.ceil(); // 向上取整

    Math.floor(); // 向下取整

    Math.max(); // 最大值

    Math.min(); // 最小值

    Math.round(); // 四舍五入

    Math.random(); // 随机数

    Math.pow(); // 指数运算

    Math.sqrt(); // 平方根

    Math.log(); // 返回以e为底的自然对数值

    Math.exp(); // 返回常数e的参数次方

    // Math属性  只读，不可修改
    Math.E // 2.718281828459045  常数e
    Math.LN2 // 0.6931471805599453   2的自然对数
    Math.LN10 // 2.302585092994046   10的自然对数
    Math.LOG2E // 1.4426950408889634  以2为底的e的对数
    Math.LOG10E // 0.4342944819032518  以10为底的e的对数
    Math.PI // 3.141592653589793 常数π
    Math.SQRT1_2 // 0.7071067811865476  0.5的平方根
    Math.SQRT2 // 1.4142135623730951  2 的平方根
}