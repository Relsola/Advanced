// 用来得到一个函数的返回值类型

{
    // 定义
    type ReturnType<T extends (...arg: any[]) => any> =
        T extends (...arg: any[]) => infer R ? R : never;


    type Func = (value: number) => string;

    const foo: ReturnType<Func> = "string";
}