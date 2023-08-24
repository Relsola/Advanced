/* 
  keyof 可以用于获取某种类型的所有键，其返回类型是联合类型。

    注：在 TypeScript 中支持两种索引签名，数字索引和字符串索引

    JavaScript 在执行索引操作时
    会先把数值索引先转换为字符串索引
    所以 keyof { [x: string]: Person } 的结果会返回 string | number。
    数字索引 -> keyof [index: number]: string => number
*/

{
    interface Person { name: string, age: number }
    type K1 = keyof Person;  // "name" | "age"
    type K2 = keyof []  // "length"  | "pop" | "push" ...
    type K3 = keyof { [x: string]: Person }  // string | number

    let k1: K1 = 'name';
    k1 = 'age';

    let k2: K2 = 2; // 数组是数字索引
    k2 = "join"

    let k3: K3 = 4
    k3 = "this is string"
}


{
    // keyof也支持基本数据类型：
    let K1: keyof boolean; // let K1: "valueOf"
    let K2: keyof number; // let K2: "toString" | "toFixed"  ...
    let K3: keyof symbol; // let K1: "valueOf" ...
}


{

    // 返回值是any
    function prop(obj: object, key: string) { return obj[key] }

    function props<T extends object, K extends keyof T>(obj: T, key: K) {
        return obj[key]
    }

    type Todo = {
        id: number
        text: string
        done: boolean
    }

    const todo: Todo = {
        id: 1,
        text: "learn typescript keyof",
        done: false
    }

    const id = props(todo, "id") // const id: number
    const text = props(todo, "text") // const text: string
    const done = props(todo, "done") // const done: boolean
    // const date = props(todo, "date"); // Error
}

