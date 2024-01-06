const key = {
  a: { a: { a: { a: { a: { a: { a: { a: { a: { a: { a: _ => console.log(1) } } } } } } } } } }
};

const data = {
  name: 'Jack',
  date: [new Date(1536627600000), new Date(1540047600000)],

  re: new RegExp('\\w+'),
  err: new Error('"x" is not defined'),

  func: function () {
    console.log(1);
  },
  val: undefined,
  sym: Symbol('foo'),

  nan: NaN,
  infinityMax: Infinity,

  key
};

key.key = data;
/* 
  浅拷贝
    1.  Object.assign

    2. 扩展运算符
*/

{
  // JSON.parse(JSON.stringify())

  console.log(data);
  const info = JSON.parse(JSON.stringify(data));
  console.log(info);

  /* 
      拷贝 Date 引用类型会变成字符串
      拷贝 RegExp Error 类型会变成空对象；
       function、undefined、symbol 会消失。
      无法处理循环引用的情况
      NaN和infinity会转换成null
    */
}

{
  // 通过递归实现深拷贝  WeakMap 弱引用优化循环引用
  function deepClone(source, map = new WeakMap()) {
    // 如果不是复杂数据类型 或者为null，直接返回
    if (typeof source !== 'object' || source === null) return source;
    if (source instanceof RegExp) return new RegExp(source);
    if (source instanceof Date) return new Date(source);
    if (source instanceof Error) return new Error(source);

    // 解决循环引用 obj[key] = obj
    if (map.has(source)) return map.get(source);
    const cloneObj = Array.isArray(source) ? [] : {};
    map.set(source, cloneObj);

    for (const key in source) {
      // 判断是否是对象自身的属性，筛掉对象原型链上继承的属性
      if (source.hasOwnProperty(key)) {
        // 如果 obj[key] 是复杂数据类型，递归
        cloneObj[key] = deepClone(source[key], map);
      }
    }
    return cloneObj;
  }
  console.log(data);
  const info = deepClone(data);
  console.log(info);
}

{
  //  函数库 lodash 里的 cloneDeep   直接引用使用
  // const lodash = require("lodash")
  // console.log(data);
  // const info = lodash.cloneDeep(data)
  // console.log(info);
}
