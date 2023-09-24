Function.prototype.bind2 = function (context, ...arg) {
    // 首先要获取调用bind的函数，也就是绑定函数，用this可以获取
    const self = this;
    const Bound = function () {
        const thisArg = arg.concat(...arguments);
        // 用于构造函数忽略this指向
        return this instanceof Bound ?
            new Bound(...thisArg)
            : self.apply(context, thisArg);
    }
    // 保护目标原型
    const emptyFn = function () { };
    emptyFn.prototype = this.prototype;
    Bound.prototype = new emptyFn();
    return Bound;
}