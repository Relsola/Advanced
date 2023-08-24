// 一. 泛型介绍
{
    /* 
      下面代码中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称
      但实际上 T 可以用任何有效名称代替。除了 T 之外
      
      以下是常见泛型变量代表的意思：
        K（Key）：表示对象中的键类型；
        V（Value）：表示对象中的值类型；
        E（Element）：表示元素类型。
    */

    const identities = <T, U>(value: T, message: U): T => {
        console.log(message);
        return value
    };

    console.log(identities<number, string>(12, "string"));

    // 除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号
    console.log(identities(17, "semLinker"));
}


// 二、泛型约束
{
    /* 
      如下假如我想打印出参数的 size 属性
      如果完全不进行约束 TS 是会报错的

      报错的原因在于 T 理论上是可以是任何类型的
      不同于 any，你不管使用它的什么属性或者方法都会报错（除非这个属性和方法是所有集合共有的）
      
      那么直观的想法是限定传给 trace 函数的参数类型应该有 size 类型，这样就不会报错了
      实现这个需求的关键在于使用类型约束
      使用 extends 关键字可以做到
      简单来说就是你定义一个类型，然后让 T 实现这个接口即可。
    */

    function trace<T>(arg: T): T {
        // console.log(arg.size); // Error 
        return arg
    };

    // 解决
    interface Sizeable { size: number, push: Function };
    const fn = <T extends Sizeable>(arg: T): T => {
        console.log(arg.size);
        arg.push(12);
        return arg;
    }
}
