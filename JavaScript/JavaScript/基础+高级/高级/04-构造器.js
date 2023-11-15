/* 
    构造器的本质式函数 构造器也叫类
    作用：统一的创建对象 ，创建出来的对象有共同的特点
*/


// 创建一个没有原型对象的对象
Object.create(null);



// 原型继承
{
    function Car(color) {
        this.tireNum = 4
        this.color = color
        say = function () {
            console.log('say..');
        }
    }

    function Tesla(color, energy) {
        this.tireNum = 4
        this.color = color
        this.energy = energy
    }

    Tesla.prototype = new Car()
    Tesla.prototype.constructor = Tesla
}

// call继承
{
    function father(name, age) {
        this.name = name
        this.age = age
    }
    function son(name, age, sex) {
        this.sex = sex
        //this指向son1
        father.call(this, name, age)
        //改变this指向 执行函数
    }
    father.prototype.say = function () {
        console.log('say..');
    }
}

// 组合继承
{
    //组合继承就是把原型继承和call继承的核心代码都写一遍
    function father(name, age) {
        this.name = name
        this, age = age
    }
    father.prototype.say = function () {
        console.log('say..');
    }

    function son(name, age, sex) {
        this.sex = sex
        father.call(this, name, age)
    }

    //原型继承的核心就是把子类的原型对象换成父类的实例化对象
    son.prototype = new father()
    son.prototype.constructor = son
    let son1 = new son('张三', 19, '男')
    console.log(son1);
    son1.say()
}


// 寄生继承
{
    function father(name, age) {
        this.name = name
        this, age = age

    }
    father.prototype.say = function () {
        console.log('say..');
    }

    function son(name, age, sex) {
        this.sex = sex
        father.call(this, name, age)
    }
    //利用Object.create创建一个新对象并且让其原型对象指向father的原型对象
    son.prototype = Object.create(father.prototype)
    son.prototype.constructor = son
    let son1 = new son('张三', 19, '男')
    console.log(son1);
    son1.say()
}


// extends 继承
{
    class student {
        //在class声明的类中有一个函数叫constructor
        //他就是构造器函数
        constructor(name, age) {
            this.name = name
            this.age = age
            //私有
        }
        //共有的
        syaHello() {
            console.log('say..');
        }
    }
    let f1 = new student('张三', 18)
    console.log(f1);

    //想继承父类需要一个关键字 叫extends
    class son extends student {
        constructor(name, age, sex) {
            super(name, age)
            this.sex = sex
        }
        sayGoodbye() {
            console.log('goodBye');
        }
    }
    let son1 = new son('向往', 18, '男')
    son1.syaHello()
    console.log(son1);
}