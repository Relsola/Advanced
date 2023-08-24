// Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
{
    // 定义
    type Exclude<T, U> = T extends U ? never : T;

    // 如果 T 能赋值给 U 类型的话，那么就会返回 never 类型，否则返回 T 类型。最终实现的效果就是将 T 中某些属于 U 的类型移除掉。

    type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
    type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
    type T2 = Exclude<string | number | (() => void), Function>; // string | number
}


