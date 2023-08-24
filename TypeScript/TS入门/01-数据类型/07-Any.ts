{
    /* 
       在 TypeScript 中，任何类型都可以被归为 any 类型。
       这让 any 类型成为了类型系统的顶级类型.
       
       如果是一个普通类型，在赋值过程中改变类型是不被允许的
       但如果是 any 类型，则允许被赋值为任意类型。
       
       在any上访问任何属性都是允许的,也允许调用任何方法.
       变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
    */

    let a: string = "seven";
    // a = 7;  // TS2322: Type 'number' is not assignable to type 'string'.

    let b: any = "seven";
    b = 7;

    let c; // any
    c = [7];
    if (c.name === undefined) console.log(c[0]);
}