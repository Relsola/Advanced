// Pick 从某个类型中挑出一些属性出来

{
    // 定义
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };

    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type TodoPreview = Pick<Todo, "title" | "completed">;

    const todo: TodoPreview = {
        title: "Clean room",
        completed: false,
    };
}