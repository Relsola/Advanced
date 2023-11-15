// 总结常用泛型工具

/* 
  typeof  in keyof  infer  extends

  - Partial<T> 将类型的属性变成可选

  - Required<T> 将类型的属性变成必选

  - Readonly<T> 将某个类型所有属性变为只读

  - Pick<T, K> 从某个类型中挑出一些属性出来

  - Record<K, T> 将 K 中所有的属性的值转化为 T 类型

  - ReturnType<T> 得到一个函数的返回值类型

  - Exclude<T, U> 将某个类型中属于另一个的类型移除掉

  - Extract<T, U> 从 T 中提取出 U

  - Omit<T, K> 使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型

  - NonNullable<T> 过滤类型中的 null 及 undefined 类型

  - Parameters<T> 用于获得函数的参数类型组成的元组类型。
*/

{
    interface Todo {
        title: string;
        description: string;
        completed?: boolean;
    };

    type k1 = Partial<Todo>;

    type k2 = Required<Todo>;

    type k3 = Readonly<Todo>

    type k4 = Pick<Todo, "title" | "completed">

    type k5 = Record<string, string | number>

    type k6 = ReturnType<() => number>

    type k7 = Exclude<"a" | "b" | "c", "a" | "b">;

    type k8 = Extract<"a" | "b" | "c", "a" | "b">;

    type k9 = Omit<Todo, "title">

    type k10 = NonNullable<string | number | null | undefined | void>

    type k11 = Parameters<(a: number, b: boolean) => string>
}