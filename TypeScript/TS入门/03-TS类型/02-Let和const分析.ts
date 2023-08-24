{
    /* 
      const 定义为一个不可变更的常量
      在缺省类型注解的情况下
      TypeScript 推断出它的类型直接由赋值字面量的类型决定
    */
    const str = "this is string"; // str : 'this is string'
    const num = 1; // num : 1
    const bool = true; // bool : true
}


{
    // 缺省显式类型注解的可变更的变量的类型转换为了赋值字面量类型的父类型

    let str = "this is string"; // string
    let num = 2; // number
    let bool = true;  // boolean

    str = 'any string';
    num = 5;
    bool = false;
}




