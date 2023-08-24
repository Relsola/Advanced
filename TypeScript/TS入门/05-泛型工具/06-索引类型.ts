/* 
  在实际开发中，我们经常能遇到这样的场景
  在对象中获取一些属性的值，然后建立对应的集合。
  可以用索引类型让TS报错 排除可以返回的undefined
  且让代码提示变得更加丰富
*/
{
    const getValue = <T, K extends keyof T>(person: T, keys: K[]) =>
        keys.map(key => person[key]) // T[K][]

    interface Person {
        name: string;
        age: number;
    }

    const person: Person = {
        name: 'tom',
        age: 17
    }

    getValue(person, ['name', 'age']) // ['tom', 17]

    // getValue(person, ['gender']) // 报错 
}