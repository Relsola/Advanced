// in 用来遍历枚举类型：

{
    type Keys = "name" | "age" | "gender"

    type Person = {
        [p in Keys]: number | string
    }

    const tom: Person = {
        name: "zhangsan",
        age: 17,
        gender: "man"
    }
}