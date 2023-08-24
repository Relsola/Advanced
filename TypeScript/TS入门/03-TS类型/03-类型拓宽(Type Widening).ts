{
  /* 
    我们将 TypeScript 的字面量子类型转换为父类型的这种设计称之为 "literal widening"，也就是字面量类型的拓宽
    
    所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足指定了初始值且未显式添加类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽。
  */

  let str = 'this is string'; // 类型是 string
  let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;
  const specifiedStr = 'this is string'; // 类型是 'this is string'
  let str2 = specifiedStr; // 类型是 'string'
  let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;
}


{
  /* 
     因为str常量不可变更，类型没有拓宽
     所以 str 的类型是 'this is string' 字面量类型。
     因为赋予的值 str 的类型是字面量类型，且没有显式类型注解
     所以str2 的类型是字面量类型
  */

  const str: 'this is string' = 'this is string' // str: 'this is string'
  let str2 = str // 即便使用 let 定义，类型是 'this is string'
}


{
  interface Vector3 { x: number, y: number, z: number }
  const getComponent = (vector: Vector3, axis: "x" | "y" | "z") => vector[axis]

  // 但是，当你尝试使用 getComponent 函数时，TypeScript 会提示以下错误信息：
  // 类型“string”的参数不能赋给类型“"x" | "y" | "z"”的参数。
  let x = "x"
  let vec = { x: 10, y: 20, z: 30 }
  // getComponent(vec, x) // Error

  // 使用 const 可以帮助我们修复前面例子中的错误
  const y = "y"; // let x:"x" = "x" 显示注解也行
  getComponent(vec, y) // 20

  const obj = { x: 1 }
  // const obj: { [key: string]: number | string } = {}
  obj.x = 6 // OK

  // obj.x = '6' // Error
  // obj.y = 8 // Error
  // obj.name = "mtf" //Error

  const arr: (string | object | number | boolean)[] = []
  arr.push("1", { x: 2 }, 3, true)
  console.log(arr);
}


{

  /*
   当你在一个值之后使用 const 断言时
   TypeScript 将为它推断出最窄的类型，没有拓宽
   对于真正的常量，这通常是你想要的。
  */

  // 提供显式类型注释
  const obj: { x: 1 | 2 | 3 } = { x: 1 }

  // const 断言
  const obj1 = { x: 1, y: 2 }; // {x: number; y: number}
  const obj2 = { x: 1 as const, y: 2 }; // {x: 1; y: number}
  const obj3 = { x: 1, y: 2 } as const; //  {readonly x: 1; readonly y: 2}

  const arr1 = [1, 2, 3]; // number[]
  const arr2 = [1, 2, 3] as const // readonly [1, 2, 3]
}