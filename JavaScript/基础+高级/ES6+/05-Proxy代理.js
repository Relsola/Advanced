//  Object.defineProperty() 实际上就是一个函数，给一个对象添加一个属性

const obj = {};

Object.defineProperty(obj, 'name', {
    // value: "", // value 这个属性的属性值
    enumerable: true, // 表示这个属性可以被遍历到(枚举)
    // writable: true, // 表示这个属性可以被更改
    set(value) {
        console.log(this); // { name: [Getter/Setter] }
        // this.name = value;
    },
    get() { return this.name; }
})

obj.name = "obj"
/*
   proxy 代理相当于你找了一个中介
   
   因为proxy是一个代理类 所以你要new出来一个实例对象
     第一个参数 就是你要代理的那个对象
     第二个参数就是配置项

    get函数有两个参数 
        第一个参数target 是我们的代理对象
        第二个参数 key 就是访问的属性名
    
    set函数有三个参数
        第一个参数target 是我们的代理对象
        第二个参数是属性名
        第三个参数是设置的新值

    has 捕获in动作 
    delete 删除
*/

const proxyObj = new Proxy(obj, {
    get(target, key) {
        console.log(`${key}被访问量`);
        return target[key];
    },

    set(target, key, num) {
        console.log(`${key}被设置了`);
        return target[key] = num;
    },

    has(target, key) {
        console.log("监听到 in", key);
        return key in target
    },

    deleteProperty(target, key) {
        console.log("delete...", key);
        delete target[key]
    }
})

proxyObj.age = 18;
proxyObj.age
"age" in proxyObj;
delete proxyObj.age;