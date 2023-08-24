// 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

{
    // 获取函数返回值的类型
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
    const sum = (a: number, b: number) => a + b;

    type SumReturnType = ReturnType<typeof sum>;  // number
}

{
    // 获取数组里的元素类型
    type ArrayElementType<T> = T extends (infer U)[] ? U : never;
    const numbers = [1, 2, 3, "4", "5"]; // (string | number)[]

    type NumberType = ArrayElementType<typeof numbers>;  // string | number
}

{
    // 提取 Promise 的 resolved 类型
    type ResolvedType<T> = T extends Promise<infer R> ? R : never;
    async function fetchData() {
        // 省略异步操作
        return "data";
    }; // Promise<string>

    type DataType = ResolvedType<ReturnType<typeof fetchData>>;  // string
}