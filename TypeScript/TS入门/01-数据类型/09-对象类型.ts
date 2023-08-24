{
  /* 
    Number、String、Boolean、Symbol
    从类型兼容性上看，原始类型兼容对应的对象类型
    反过来对象类型不兼容对应的原始类型。
  */

  let num: number = 1;
  let Num: Number = 1;

  Num = num; // OK
  // num = Num; // Error
}

{
  /* 
    object（首字母小写，以下称“小 object”）
    Object（首字母大写，以下称“大 Object”）
    {}（以下称“空对象”）
  */

  /*
    大 Object代表所有拥有 toString、hasOwnProperty 方法的类型
    所以所有原始类型、非原始类型都可以赋给 Object。
    同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。
  */

  let obj: Object;
  obj = 1; // OK
  obj = true; // OK
  obj = {}; // OK
  // obj = undefined; // Error
  // obj = null; // Error
}


{
  // 大 Object 不仅是小 object 的父类型，同时也是小 object 的子类型。

  type isLowerCaseObjectExtendsUpperCaseObject =
    object extends Object ? true : false; // true

  type isUpperCaseObjectExtendsLowerCaseObject =
    Object extends object ? true : false; // true

  let objM: object = {};
  let objX: object = {};

  // objM = objX; // OK
  // objX = objM; // OK

  // 尽管官方文档说可以使用小 object 代替大 Object，但是我们仍要明白大 Object 并不完全等价于小 object

}

{
  // {}空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，null 和 undefined 也不能赋给 {}

  let ObjectLiteral: {};
  ObjectLiteral = 1; // ok
  ObjectLiteral = 'a'; // ok
  ObjectLiteral = true; // ok
  // ObjectLiteral = null; // ts(2322)
  // ObjectLiteral = undefined; // ts(2322)
  ObjectLiteral = {}; // ok

  // 综上结论：{}、大 Object 是比小 object 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则表示非原始类型。
}