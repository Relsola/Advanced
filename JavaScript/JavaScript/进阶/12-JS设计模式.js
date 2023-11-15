/* 
  在软件工程中，设计模式是对软件设计中普遍存在的各种问题所提出的解决方案
  
  设计模式并不直接用来完成代码的编写，而是描述在各种不同情况下，要怎么解决问题的一种方案
  
  设计模式能使不稳定依赖于相对稳定、具体依赖于相对抽象，避免会引起麻烦的紧耦合，以增强软件设计面对并适应变化的能力
  
  因此，当我们遇到合适的场景时，我们可能会条件反射一样自然而然想到符合这种场景的设计模式


  常见的设计模式有：
    - 单例模式
    - 工厂模式
    - 策略模式
    - 代理模式
    - 中介者模式
    - 装饰者模式
*/



{
    /*
      单例模式
        保证一个类仅有一个实例，并提供一个访问它的全局访问点
        实现的方法为先判断实例存在与否，如果存在则直接返回
        如果不存在就创建了再返回，这就确保了一个类只有一个实例对象


        从定义上来看，全局变量好像就是单例模式
        但是一般情况我们不认为全局变量是一个单例模式，原因是：
          全局命名污染
          不易维护，容易被重写覆盖
    */

    {
        // 定义一个类
        function Singleton(name) {
            this.name = name;
            this.instance = null;
        }
        // 原型扩展类的一个方法getName()
        Singleton.prototype.getName = function () {
            console.log(this.name)
        };
        // 获取类的实例
        Singleton.getInstance = function (name) {
            if (!this.instance) {
                this.instance = new Singleton(name);
            }
            return this.instance
        };

        // 获取对象1
        const a = Singleton.getInstance('a');
        // 获取对象2
        const b = Singleton.getInstance('b');
        // 进行比较
        console.log(a === b);
    }

    {
        // 闭包
        function Singleton(name) {
            this.name = name;
        }
        // 原型扩展类的一个方法getName()
        Singleton.prototype.getName = function () {
            console.log(this.name)
        };
        // 获取类的实例
        Singleton.getInstance = (function () {
            var instance = null;
            return function (name) {
                if (!this.instance) {
                    this.instance = new Singleton(name);
                }
                return this.instance
            }
        })();

        // 获取对象1
        const a = Singleton.getInstance('a');
        // 获取对象2
        const b = Singleton.getInstance('b');
        // 进行比较
        console.log(a === b);
    }

    {
        // 单例构造函数
        function CreateSingleton(name) {
            this.name = name;
            this.getName();
        };

        // 获取实例的名字
        CreateSingleton.prototype.getName = function () {
            console.log(this.name)
        };
        // 单例对象
        const Singleton = (function () {
            var instance;
            return function (name) {
                if (!instance) {
                    instance = new CreateSingleton(name);
                }
                return instance;
            }
        })();

        // 创建实例对象1
        const a = new Singleton('a');
        // 创建实例对象2
        const b = new Singleton('b');

        console.log(a === b); // true
    }
}



{
    /*
      工厂模式  
        工厂模式是用来创建对象的一种最常用的设计模式，不暴露创建对象的具体逻辑
        而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂
    */

    {
        // 简单工厂模式  用一个工厂对象创建同一类对象类的实例
        function Factory(career) {
            function User(career, work) {
                this.career = career
                this.work = work
            }
            let work;
            switch (career) {
                case 'coder':
                    work = ['写代码', '修Bug']
                    return new User(career, work)
                case 'hr':
                    work = ['招聘', '员工信息管理']
                    return new User(career, work)
                case 'driver':
                    work = ['开车']
                    return new User(career, work)
                case 'boss':
                    work = ['喝茶', '开会', '审批文件']
                    return new User(career, work)
            }
        }
        const coder = new Factory('coder')
        console.log(coder)
        const boss = new Factory('boss')
        console.log(boss)

        // Factory就是一个简单工厂。当我们调用工厂函数时，只需要传递name、age、career就可以获取到包含用户工作内容的实例对象
    }

    {
        // 工厂方法模式  把具体的产品放到了工厂函数的prototype中

        // 工厂方法
        function Factory(career) {
            if (this instanceof Factory)
                return new this[career]();
            else
                return new Factory(career);
        }

        // 工厂方法函数的原型中设置所有对象的构造函数
        Factory.prototype = {
            'coder': function () {
                this.careerName = '程序员'
                this.work = ['写代码', '修Bug']
            },
            'hr': function () {
                this.careerName = 'HR'
                this.work = ['招聘', '员工信息管理']
            },
            'driver': function () {
                this.careerName = '司机'
                this.work = ['开车']
            },
            'boss': function () {
                this.careerName = '老板'
                this.work = ['喝茶', '开会', '审批文件']
            }
        }
        const coder = new Factory('coder')
        console.log(coder)
        const hr = new Factory('hr')
        console.log(hr)

        // 这样一来，扩展产品种类就不必修改工厂函数了，和心累就变成抽象类，也可以随时重写某种具体的产品
    }

    {
        // 抽象工厂模式
        // 简单工厂和工厂方法模式的工作是生产产品，那么抽象工厂模式的工作就是生产工厂的

        const CareerAbstractFactory = function (subType, superType) {
            // 判断抽象工厂中是否有该抽象类
            if (typeof CareerAbstractFactory[superType] === 'function') {
                // 缓存类
                function F() { }
                // 继承父类属性和方法
                F.prototype = new CareerAbstractFactory[superType]()
                // 将子类的constructor指向父类
                subType.constructor = subType;
                // 子类原型继承父类
                subType.prototype = new F()
            } else {
                throw new Error('抽象类不存在')
            }
        }

        CareerAbstractFactory['coder'] = function () {
            this.careerName = '程序员'
            this.work = ['写代码', '修Bug']
        }

        // 抽象子类
        function AbstractClass() {
            this.sharedProperty = "Shared Property";
        }

        console.log(AbstractClass.prototype);
        console.log(AbstractClass.constructor);
        console.log(AbstractClass.prototype.constructor);
        CareerAbstractFactory(AbstractClass, "coder");
        console.log(AbstractClass.prototype);
        console.log(AbstractClass.prototype.constructor);
        console.log(AbstractClass.constructor);

        // 该方法在参数中传递子类和父类，在方法体内部实现了子类对父类的继承
    }

    /* 
      有构造函数的地方，就应该考虑简单工厂
      但是如果函数构建函数太多与复杂，会导致工厂函数变得复杂，所以不适合复杂的情况
      
      抽象工厂模式一般用于严格要求以面向对象思想进行开发的超大型项目中，我们一般常规的开发的话一般就是简单工厂和工厂方法模式会用的比较多一些

      如果你不想让某个子系统与较大的那个对象之间形成强耦合，而是想运行时从许多子系统中进行挑选的话，那么工厂模式是一个理想的选择
      将new操作简单封装，遇到new的时候就应该考虑是否用工厂模式；
      需要依赖具体环境创建不同实例，这些实例都有相同的行为,这时候我们可以使用工厂模式，简化实现的过程，同时也可以减少每种对象所需的代码量，有利于消除对象间的耦合，提供更大的灵活性
    */
}



{
    /*
      观察者模式
        观察者模式定义了对象间的一种一对多的依赖关系
        当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新
        观察者模式属于行为型模式，行为型模式关注的是对象之间的通讯
        观察者模式就是观察者和被观察者之间的通讯
    */

    // 被观察者模式
    class Subject {

        constructor() {
            this.observerList = [];
        }

        addObserver(observer) {
            this.observerList.push(observer);
        }

        removeObserver(observer) {
            const index = this.observerList.findIndex(o => o.name === observer.name);
            this.observerList.splice(index, 1);
        }

        notifyObservers(message) {
            const observers = this.observerList;
            observers.forEach(observer => observer.notified(message));
        }

    }


    // 观察者
    class Observer {

        constructor(name, subject) {
            this.name = name;
            if (subject) {
                subject.addObserver(this);
            }
        }

        notified(message) {
            console.log(this.name, 'got message', message);
        }
    }


    const subject = new Subject();
    const observerA = new Observer('observerA', subject);
    const observerB = new Observer('observerB');
    subject.addObserver(observerB);
    subject.notifyObservers('Hello from subject');
    subject.removeObserver(observerA);
    subject.notifyObservers('Hello again');
}



{
    /* 
      发布订阅模式
        发布-订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。
        而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在
        
        同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者存在
    */

    class PubSub {
        constructor() {
            this.messages = {};
            this.listeners = {};
        }
        // 添加发布者
        publish(type, content) {
            const existContent = this.messages[type];
            if (!existContent) {
                this.messages[type] = [];
            }
            this.messages[type].push(content);
        }
        // 添加订阅者
        subscribe(type, cb) {
            const existListener = this.listeners[type];
            if (!existListener) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(cb);
        }
        // 通知
        notify(type) {
            const messages = this.messages[type];
            const subscribers = this.listeners[type] || [];
            subscribers.forEach((cb, index) => cb(messages[index]));
        }
    }

    // 发布者代码
    class Publisher {
        constructor(name, context) {
            this.name = name;
            this.context = context;
        }
        publish(type, content) {
            this.context.publish(type, content);
        }
    }


    // 订阅者代码
    class Subscriber {
        constructor(name, context) {
            this.name = name;
            this.context = context;
        }
        subscribe(type, cb) {
            this.context.subscribe(type, cb);
        }
    }


    const TYPE_A = 'music';
    const TYPE_B = 'movie';
    const TYPE_C = 'novel';

    const pubsub = new PubSub();

    const publisherA = new Publisher('publisherA', pubsub);
    publisherA.publish(TYPE_A, 'we are young');
    publisherA.publish(TYPE_B, 'the silicon valley');
    const publisherB = new Publisher('publisherB', pubsub);
    publisherB.publish(TYPE_A, 'stronger');
    const publisherC = new Publisher('publisherC', pubsub);
    publisherC.publish(TYPE_C, 'a brief history of time');

    const subscriberA = new Subscriber('subscriberA', pubsub);
    subscriberA.subscribe(TYPE_A, res => {
        console.log('subscriberA received', res)
    });
    const subscriberB = new Subscriber('subscriberB', pubsub);
    subscriberB.subscribe(TYPE_C, res => {
        console.log('subscriberB received', res)
    });
    const subscriberC = new Subscriber('subscriberC', pubsub);
    subscriberC.subscribe(TYPE_B, res => {
        console.log('subscriberC received', res)
    });

    pubsub.notify(TYPE_A);
    pubsub.notify(TYPE_B);
    pubsub.notify(TYPE_C);


    /*
       在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录
       在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
    
       在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
    
       观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法
       而发布-订阅模式大多数时候是异步的（使用消息队列）
    */
}



{
    /*
      策略模式
        策略模式，就是定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换
        至少分成两部分：
          策略类（可变），策略类封装了具体的算法，并负责具体的计算过程
          环境类（不变），接受客户的请求，随后将请求委托给某一个策略类
    
    */

    // 若使用if来实现，代码则如下
    var registerForm = document.getElementById("registerForm");
    registerForm.onsubmit = function () {
        if (registerForm.userName.value === '') {
            alert('用户名不能为空');
            return;
        }
        if (registerForm.password.value.length < 6) {
            alert("密码的长度不能小于6位");
            return;
        }
        if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
            alert("手机号码格式不正确");
            return;
        }
    }
    // 函数内部包含过多if...else，并且后续改正的时候，需要在函数内部添加逻辑，违反了开放封闭原则



    // 策略模式:
    const strategy = {
        isNotEmpty: (value, errorMsg) =>
            value === '' ? errorMsg : null,

        // 限制最小长度
        minLength: (value, length, errorMsg) =>
            value.length < length ? errorMsg : null,

        // 手机号码格式
        mobileFormat: (value, errorMsg) =>
            !/^1[358][0-9]{9}$/.test(value) ? errorMsg : null,
    };

    // 保存效验规则
    function Validator() { this.cache = [] }

    Validator.prototype.add = function (dom, rules, errorMsg) {
        this.cache.push(() => {
            const arg = rules.split(":");
            const rule = arg[0];
            arg[0] = dom.value;
            arg.push(errorMsg);
            return strategy[rule](...arg)
        });
    };

    Validator.prototype.start = function () {
        // 开始效验 并取得效验后的返回信息
        const n = this.cache.length
        for (let i = 0; i < n;) {
            const msg = this.cache[i++]()
            if (msg !== null) return msg;
        }
        return null
    };

    // 创建一个表单校验规则
    const validateFunc = () => {
        // 创建一个Validator对象
        const validator = new Validator();

        /* 添加一些效验规则 */
        validator.add(registerForm.userName, 'isNotEmpty', '用户名不能为空');
        validator.add(registerForm.password, 'minLength:6', '密码长度不能小于6位');
        validator.add(registerForm.userName, 'mobileFormat', '手机号码格式不正确');

        // 返回效验结果
        return validator.start();
    };

    const registerForm = document.getElementById("registerForm");
    registerForm.onsubmit = () => {
        const errorMsg = validateFunc();
        if (errorMsg !== null) {
            alert(errorMsg);
            return false;
        }
        return true
    }


    /*
      策略模式利用组合，委托等技术和思想，有效的避免很多if条件语句
      策略模式提供了开放-封闭原则，使代码更容易理解和扩展
      策略模式中的代码可以复用

      策略模式不仅仅用来封装算法，在实际开发中，通常会把算法的含义扩散开来，使策略模式也可以用来封装 一系列的“业务规则”
      只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们
    */
}

{
    /*
      代理模式
        为对象提供一个代用品或占位符，以便控制对它的访问
    */

    {
        // 缓存代理
        const mute = function () {
            console.log("开始计算乘积");
            let a = 1;
            for (let i = 0, l = arguments.length; i < l; i++)
                a *= arguments[i];
            return a;
        };

        const proxyMuTe = (function () {
            const cache = {};
            return function () {
                const args = Array.prototype.join.call(arguments, "");
                if (args in cache) {
                    return cache[args];
                }
                return (cache[args] = mute.apply(this, arguments));
            };
        })();

        console.log(proxyMuTe(1, 2, 3, 4)); // 输出:24
        console.log(proxyMuTe(1, 2, 3, 4)); // 输出:24
    }


    {
        // 虚拟代理
        // 虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建
        // 常见的就是图片预加载功能：

        // 未使用代理模式如下：
        let MyImage = (function () {
            let imgNode = document.createElement('img');
            document.body.appendChild(imgNode);
            // 创建一个Image对象，用于加载需要设置的图片
            let img = new Image;

            img.onload = function () {
                // 监听到图片加载完成后，设置src为加载完成后的图片
                imgNode.src = img.src;
            };

            return {
                setSrc: function (src) {
                    // 设置图片的时候，设置为默认的loading图
                    imgNode.src = 'https://img.zcool.cn/community/01deed576019060000018c1bd2352d.gif';
                    // 把真正需要设置的图片传给Image对象的src属性
                    img.src = src;
                }
            }
        })();
        MyImage.setSrc('https://xxx.jpg');
        // MyImage对象除了负责给img节点设置src外，还要负责预加载图片，违反了面向对象设计的原则——单一职责原则  上述过程 loading 则是耦合进MyImage对象里的，如果以后某个时候，我们不需要预加载显示loading这个功能了，就只能在MyImage对象里面改动代码



        // 使用代理模式
        // 图片本地对象，负责往页面中创建一个img标签，并且提供一个对外的setSrc接口
        let myImage = (function () {
            let imgNode = document.createElement('img');
            document.body.appendChild(imgNode);

            return {
                //setSrc接口，外界调用这个接口，便可以给该img标签设置src属性
                setSrc: function (src) {
                    imgNode.src = src;
                }
            }
        })();
        // 代理对象，负责图片预加载功能
        let proxyImage = (function () {
            // 创建一个Image对象，用于加载需要设置的图片
            let img = new Image;
            img.onload = function () {
                // 监听到图片加载完成后，给被代理的图片本地对象设置src为加载完成后的图片
                myImage.setSrc(this.src);
            }
            return {
                setSrc: function (src) {
                    // 设置图片时，在图片未被真正加载好时，以这张图作为loading，提示用户图片正在加载
                    myImage.setSrc('https://img.zcool.cn/community/01deed576019060000018c1bd2352d.gif');
                    img.src = src;
                }
            }
        })();

        proxyImage.setSrc('https://xxx.jpg');
        /* 
          使用代理模式后，图片本地对象负责往页面中创建一个img标签，并且提供一个对外的setSrc接口；
          代理对象负责在图片未加载完成之前，引入预加载的loading图，负责了图片预加载的功能
          上述并没有改变或者增加MyImage的接口，但是通过代理对象，实际上给系统添加了新的行为
          并且上述代理模式可以发现，代理和本体接口的一致性，如果有一天不需要预加载，那么就不需要代理对象，可以选择直接请求本体。其中关键是代理对象和本体都对外提供了 setSrc 方法
        */
    }
}


/* 
  中介者模式
    通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信
    而不是相互引用，当其中的一个对象发生改变时，只需要通知中介者对象即可
    通过中介者模式可以解除对象与对象之间的紧耦合关系

*/


/* 
  装饰者模式
    在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法
    通常运用在原有方法维持不变，在原有方法上再挂载其他方法来满足现有需求

*/


/* 
  不断去学习设计模式，会对我们有着极大的帮助，主要如下：
  
    - 从许多优秀的软件系统中总结出的成功的、能够实现可维护性、复用的设计方案，使用这些方案将可以让我们避免做一些重复性的工作
  
    - 设计模式提供了一套通用的设计词汇和一种通用的形式来方便开发人员之间沟通和交流，使得设计方案更加通俗易懂
  
    - 大部分设计模式都兼顾了系统的可重用性和可扩展性，这使得我们可以更好地重用一些已有的设计方案、功能模块甚至一个完整的软件系统，避免我们经常做一些重复的设计、编写一些重复的代码
  
    - 合理使用设计模式并对设计模式的使用情况进行文档化，将有助于别人更快地理解系统
  
    - 学习设计模式将有助于初学者更加深入地理解面向对象思想
*/