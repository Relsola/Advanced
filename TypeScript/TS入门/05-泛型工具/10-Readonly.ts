// Readonly<T> 的作用是将某个类型所有属性变为只读属性，不能被重新赋值。

{
    // 定义
    type Readonly<T> = {
        readonly [K in keyof T]: T[K]
    }

    interface Todo { title: string }

    const todo: Readonly<Todo> = {
        title: "Delete inactive users"
    };

    // todo.title = "Hello"; // Error: cannot reassign a readonly property
}