// Symbol Number String Boolean Undefined Null Object
{
    // Symbol数据是独一无二的 每一次生成都是一个独一无二的数据
    console.log(Symbol('s') === Symbol('s'));

    const symbol = Symbol();
    const obj = {};
    const obj1 = {};

    obj[symbol] = "hello";
    const obj2 = { [symbol]: "world" }
    Object.defineProperty(obj1, symbol, { value: " " })

    console.log(obj[symbol] + obj1[symbol] + obj2[symbol]); // hello world
}


// Set 不会出现重复的元素
{
    /*  
      set结构常用的四种操作方式
        1. add() 添加 返回值是set结构本身 size属性就是长度
        2. delete() 删除某个值 返回布尔值 表示删除是否成功
        3. has() 表示查找是否有某个值 返回是布尔
        4. clear() 清除所有成员 
    */
    const set = new Set();
    console.log(set.add("1"));
    console.log(set.has("1"));
    console.log(set.delete("1"));
    console.log(set.clear("1"));
}


// WeakSet 只能放对象类型的数据，不能放基本数据类型
{
    /* 
      WeakSet 对于元素的引用是弱引用，如果没有其他引用对某个对象进行引用，那么GC可以对该对象进行回收
      WeakSet 不能遍历 如果我们遍历了，那么其中的元素不能正常销毁
    */

    // WeakSet可以保护我们的方法
    const pws = new WeakSet();
    class Person {
        constructor() {
            pws.add(this); // 实例化对象 
        }

        running() {
            return pws.has(this) ? "run..." : "调用错误"
        }
    }

    const p = new Person();
    const run = p.running

    console.log(p.running());
    console.log(run());
}


// map 字典结构 映射关系
{
    /*  
       set(key,value) 设置值 返回的是整个map数据
       get(key) 获取 value
       has(key) 判断是否存在
       delete(key) 删除
       clear() 清空
       可以使用for of 或者forEach循环 
     */

}

// WeakMap 不能使用基本数据类型作为key
{
    // set get delete has
}