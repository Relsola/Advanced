{
    // 函数声明
    function sum(x: number, y: number): number {
        return x + y
    }
    console.log(sum(1, 2));
}


{
    /*
       用接口定义函数类型
       用函数表达式接口定义函数的方式时，对等号左侧进行类型限制
       可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
    */

    interface SearchFunc {
        (source: string, subString: string): boolean
    };

    const fn: SearchFunc = (a, b) => a === b;
    console.log(fn("a", "b"));
}


{
    // 可选参数  参数默认值
    // 注意点：可选参数后面不允许再出现必需参数

    const reduce = (x: number = 0, y?: number): number => {
        if (y === undefined) return x;
        return y - x;
    };

    console.log(reduce());
}


{
    // 剩余参数
    const push = (arr: any[], ...items: any[]): void => {
        for (const item of items) arr.push(item);
    };

    const a: any[] = [];
    push(a, '1', 2, true);
    console.log(a);
}


{
    /* 
       函数重载

       函数重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力
       为同一个函数提供多个函数类型定义来进行函数重载
       编译器会根据这个列表去处理函数的调用。
    */

    function add(x: number, y: number): number;
    function add(x: number, y: string): string;
    function add(x: string, y: number): string;
    function add(x: string, y: string): string;
    function add(x: number | string, y: number | string) {
        if (typeof x === 'string' || typeof y === 'string') {
            return x.toString() + y.toString()
        }
        return x + y
    }

    const result = add(1, '2')
    console.log(result.split(''));
}