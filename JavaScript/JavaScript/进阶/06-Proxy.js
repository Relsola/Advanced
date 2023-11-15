console.log(typeof Proxy); // function

const obj = {
    name: "alice",
    showName() {
        console.log(`my name is ${this.name}`);
    }
}


// 增删改查
obj.age = 17;
console.log("age" in obj); // true
delete obj.age



// 遍历对象的所有属性
console.log(Object.getOwnPropertyNames(obj)); // [ 'name', 'showName' ]
console.log(Object.getOwnPropertySymbols(obj)); // []
console.log(Object.keys(obj)); // [ 'name', 'showName' ]
for (const key in obj) console.log(key); // name showName



// 获取对象的某个属性的描述对象
console.log(Object.getOwnPropertyDescriptor(obj, "name"));
// { value: 'alice', writable: true, enumerable: true, configurable: true }



// 使用Object身上的方法，为某个对象添加一个或多个属性
Object.defineProperty(obj, "age", {
    value: 17,
    writable: true,
    enumerable: true,
    configurable: true
})

Object.defineProperties(obj, {
    showAge: {
        value: function () { console.log(`my age is ${this.age}`) },
        writable: true,
        enumerable: true,
        configurable: true
    },
    showInfo: {
        value: function () { console.log(`我叫${this.name}，今年${this.age}岁`) },
        writable: true,
        enumerable: true,
        configurable: true
    }
})
obj.showInfo(); // 我叫alice，今年17岁



// 获取一个对象的原型对象
Object.getPrototypeOf(obj)
console.log(Object.getPrototypeOf(obj) === obj.__proto__); // true



// 设置某个对象的原型属性对象
Object.setPrototypeOf(obj, null);


// 让一个对象变得不可扩展，即不能添加新的属性 查看一个对象是不是可扩展的
Object.preventExtensions(obj)
console.log(Object.isExtensible(obj)); // false


// 如果对象为function类型，function类型的对象可以执行被执行符号()以及.call()和.apply()执行
function fn(...args) {
    console.log(this, args)
}
fn(1, 2, 3);
fn.call(obj, 1, 2, 3);
fn.apply(obj, [1, 2, 3]);


// 一切皆是对象。如果对象作为构造函数时，则该对象可以用new生成出新的对象
function Person() { }
let p1 = new Person();






// ---------------------------------------------------------------------

const person = { name: "Alice" };

const proxy = new Proxy(person, {

    // 1. get方法 接受3个参数 target, propKey, receiver，
    // 要代理的目标对象 对象上的属性 代理对象
    // 该方法用于拦截某个属性的读取操作
    get: function (target, propKey, receiver) {
        console.log(proxy === receiver); // true
        if (propKey in target)
            return target[propKey]
        else
            throw new ReferenceError(`Prop name ${propKey} does not exist.`)
    },


    // 2. set方法 接受4个参数 target, propKey, value, receiver
    // 要代理的目标对象 对象上的属性 属性对应的值 代理对象
    // 该方法用于拦截对象属性操作
    set: function (target, propKey, value, receiver) {
        console.log(`设置 ${target} 的${propKey} 属性，值为${value}`);
        target[propKey] = value;
    },


    // 3. has方法 接受 target, propKey 
    // 用于拦截 propKey in proxy的操作
    // 返回一个布尔值，表示属性是否存在
    has: function (target, propKey) {
        return propKey in target
    },


    // 4. deleteProperty方法 可接收target, propKey，
    // 用于拦截delete操作，
    // 返回一个布尔值，表示是否删除成功
    deleteProperty(target, propKey) {
        return delete target[propKey]
    },


    /* 
       5. ownKeys方法
          接收target
          用于拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环等类似操作
          返回一个数组，表示对象所拥有的keys
    */
    ownKeys(target) {
        return Object.getOwnPropertyNames(target) // 为了省事
    },


    /* 
       6. getOwnPropertyDescriptor方法 
          接收target和propKey，
          用于拦截 Object.getOwnPropertyDescriptor(proxy, propKey)
          返回属性的描述对象
    */
    getOwnPropertyDescriptor(target, propKey) {
        return Object.getOwnPropertyDescriptor(target, propKey)
    },


    /* 
       7. defineProperty方法
          接收target, propKey, propDesc，
          目标对象、目标对象的属性，以及属性描述配置
          用于拦截 Object.defineProperty() 和 Object.defineProperties()
    */
    defineProperty(target, propKey, propKeyPropDesc) {
        return Object.defineProperty(target, propKey, propKeyPropDesc)
    },


    /* 
       8. preventExtensions 方法 
         可接收target
         用于拦截 Object.preventExtensions(proxy)操作
    */
    preventExtensions(target) {
        return Object.preventExtensions(target)
    },



    /* 
       9. getPrototypeOf(target) 
          在使用Object.getPrototypeOf(proxy)会触发调用
          返回一个对象
    */
    getPrototypeOf(target) {
        return Object.getPrototypeOf(target)
    },



    /* 
      10. isExtensible(target) 
          当使用Object.isExtensible(proxy)时会触发调用
          返回一个布尔值，表示是否可扩展
    */
    isExtensible(target) {
        return Object.isExtensible(target)
    },


    /* 
      11. setPrototypeOf(target, proto) 
          当调用Object.setPrototypeOf(proxy, proto)会触发该函数调用
    */
    setPrototypeOf(target, proto) {
        console.log(`设置${target}的原型为${proto}`);
        return Object.setPrototypeOf(target, proto)
    },


    /* 
      12. apply(target, object, args)
      接收三个参数 target, object, args
      目标对象 调用函数是的this指向 参数列表
      当Proxy实例作为函数调用时触发
      比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
    */
    apply(target, object, args) {
        console.log(`调用了f`);
        return target.call(object, ...args)
    },



    /* 
       13. construct(target, args) 
          接收target和args，
          目标函数  参数列表
          当 Proxy 实例作为构造函数时触发该函数调用
          比如new proxy(...args)
    */
    construct(target, args) {
        console.log(`调用了construct`);
        return new target(...args)
    }
})


function Proxy(target, handler) {
    //...
}


/* 
   总结：
      1. 代理对象不等于目标对象，他是目标对象的包装品
      2. 目标对象既可以直接操作，也可以被代理对象操作，且两者相互关联
      3. 如果直接操作目标对象，则会绕过代理定义的各种拦截行为
      4. 如果用了代理，那肯定是希望给对象的操作嵌入我们定义的特殊行为，所以一般就操作代理对象就好

*/