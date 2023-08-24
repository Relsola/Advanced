/* 
  在面向对象语言中，接口（Interfaces）是一个很重要的概念
  它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
  
  TypeScript 中的接口是一个非常灵活的概念
  除了可用于[对类的一部分行为进行抽象]以外
  也常用于对「对象的形状（Shape）」进行描述。
*/

{
    /*
      接口一般首字母大写。
      定义的变量比接口少了一些属性是不允许的：
      多一些属性也是不允许的：
    */

    interface Person {
        name: string
        age: number
        once?: number // 可选属性
    }

    let Tom: Person = { name: 'Tom', age: 18 }
    // let Tom1: Person = { name: 'Tom', age: 18 ,gender:"男"} // Error
    // let Tom2: Person = { name: 'Tom' } // Error 
}


{
    /*
      任意属性
      有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性
      这时我们可以使用 索引签名 的形式来满足上述要求

      需要注意的是，一旦定义了任意属性
      那么确定属性和可选属性的类型都必须是它的类型的子集

      一个接口中只能定义一个任意属性
      如果接口中有多个类型的属性
      则可以在任意属性中使用联合类型：
    */

    interface Person {
        name: string,
        age?: number, // 这里真实的类型应该为：number | undefined
        [key: string]: string | number | undefined
    }

    const tom: Person = {
        name: "Tom",
        age: 17,
        gender: "male"
    }
}


{
    /* 
      只读属性用于限制只能在对象刚刚创建的时候修改其值
      TypeScript 还提供了 ReadonlyArray<T> 类型
      确保数组创建后再也不能被修改。
    */

    let a: number[] = [1, 2, 3]
    let ro: ReadonlyArray<number> = a
    // ro[0] = 12 // Error
    // ro.push(5) // Error
    // ro.length = 100 // Error
    // a = ro // Error
}