// Omit<T, K extends keyof any> 使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。

{
    // 定义
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type TodoPreview = Omit<Todo, "description">;

    const todo: TodoPreview = {
        title: "Clean room",
        completed: false,
    };
}