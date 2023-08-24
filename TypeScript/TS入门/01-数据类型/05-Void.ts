{
    /* 
       void表示没有任何类型，和其他类型是平等关系，不能直接赋值:
       let a: void; // Error

       你只能为它赋予null和undefined（在strictNullChecks未指定为true时）
       一般也只有在函数没有返回值时去声明。

       值得注意的是，方法没有返回值将得到undefined
       但是我们需要定义成void类型，而不是undefined类型。
    */

    const fun = (): void => { 1 + 1 }
}