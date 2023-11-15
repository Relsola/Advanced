// 1. 当属性名和属性保持一致的时候，可以简写

// 2. Object.defineProperty
Object.defineProperty("对象", "属性", {
    value: '张三',
    enumerable: false, // 是否能被枚举
    writable: false, // 是否可写
    get() {
        console.log('get...');
    },
    set() {
        console.log('set...');
    }
})

// 3. Object.assign 方法用来将源对象中所有可枚举的属性赋值到目标对象
// 如果后续对象中，属性重名,后面的属性会覆盖掉前面的