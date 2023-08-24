/* 
  typeof 的主要用途是在类型上下文中获取变量或者属性的类型

  此外，typeof 操作符除了可以获取对象的结构类型之外
  它也可以用来获取函数对象的类型

*/

{
    interface Person {
        name: string;
        age: number;
    }

    const sem: Person = { name: "张三", age: 18 };
    type Sem = typeof sem; // type Sem = Person
    const son: Sem = { name: "李四", age: 17 };

    const message = {
        name: "jimmy",
        age: 18,
        address: {
            province: '四川',
            city: '成都'
        }
    }
    type Message = typeof message;
}


{
    function toArray(x: number): Array<number> {
        return [x];
    }

    type Func = typeof toArray; // -> (x: number) => number[]

    const num = 10
    type n = typeof num // 也支持基本类型和字面量类型
}