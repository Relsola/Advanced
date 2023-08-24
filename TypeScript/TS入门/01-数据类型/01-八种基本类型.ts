// 八种基本数据类型
{
    const str: string = "str";
    const num: number = 24;
    const bool: boolean = true;
    const u: undefined = undefined;
    const n: null = null;
    const obj: object = { num: 1 };
    const big: bigint = 100n;
    const sym: symbol = Symbol("symbol");

    console.log(str);
    console.log(num);
    console.log(bool);
    console.log(u);
    console.log(n);
    console.log(obj);
    console.log(big);
    console.log(sym);

    /* 
       默认情况下 null 和 undefined 是所有类型的子类型。 
          就是说你可以把 null 和 undefined 赋值给其他类型。
        
       如果你在tsconfig.json指定了"strictNullChecks":true 
          null 和 undefined 只能赋值给 void 和它们各自的类型。
    */
}
