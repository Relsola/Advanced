/* 
    每个类都有有一个构造器
        constructor
        1. 内部创建了一个对象
        2. 将构造器的显示原型赋值给创建出来的对象的隐式原型
        3. 将对象赋值给this，让this指向对象
        4. 执行内部代码
        5. 返回对象
*/

class Car {
    constructor(color, address) {
        this.trieNum = 4;
        this.color = color;
        this._address = address ?? "北京";
    }

    // 共有的属性 会放到原型对象上
    running() {
        console.log('running..');
    }

    // 静态属性只能由构造器访问
    static eating() {
        console.log('eating..');
    }

    //设置器和访问器 (get,set)对我们的获取动作和获取动作做监听
    get address() {
        console.log(`get被调用了,address被访问了`);
        return this._address
    }

    //访问器
    set address(value) {
        console.log('set被调用了');
        this._address = value
    }
}

const car = new Car('white', '北京')
console.log(car);

//hasOwnProperty 判断一个对象上是否有某个属性(对象本身)
console.log(car.hasOwnProperty('color')); // true

car.running()
console.log(car.__proto__.hasOwnProperty('running')); // true

console.log(car.address);
console.log(car._address);
car.address = '上海'


//当你想继承一个类的时候 需要用extends
class BYD extends Car {
    constructor(color, type) {
        // super 继承父类的属性 等于调用了父类的constructor
        super(color)

        // 一定要把super放到上面
        this.type = type
    }
}
const byd = new BYD('white', '宋')
console.log(byd);

console.log(byd.__proto__.__proto__.hasOwnProperty('running')); // true