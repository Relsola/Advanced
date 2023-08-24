// extends 关键字添加泛型约束。

{
    interface Lengthwise { length: number; }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

    // 现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
    // loggingIdentity(3);  // Error, number doesn't have a .length property

    // 这时我们需要传入符合约束类型的值，必须包含length属性：
    loggingIdentity({ length: 10, value: 3 });

    // 条件类型约束
    type TypeName<T> = T extends string ? "string" :
        T extends number ? "number" :
        T extends boolean ? "boolean" :
        T extends undefined ? "undefined" :
        "object";

    type TypeA = TypeName<string>;  // "string"
    type TypeB = TypeName<number>;  // "number"
    type TypeC = TypeName<boolean>; // "boolean"
    type TypeD = TypeName<undefined>; // "undefined"
    type TypeE = TypeName<object>; // "object"


    // 条件类型递归
    type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

    type NestedArray = [1, [2, [3, [4]]]];
    type FlattenedArray = Flatten<NestedArray>;  // 1 | 2 | 3 | 4
}