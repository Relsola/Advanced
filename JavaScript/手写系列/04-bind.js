Function.prototype.bind2 = function (context, ...rest) {
    // 首先要获取调用bind的函数，也就是绑定函数，用this可以获取
    const self = this;
    const bound = function (...args) {
        // 用于构造函数忽略this指向
        context = this instanceof bound ? this : context
        return self.apply(context, rest.concat(args));
    }
    // 保护目标原型
    const emptyFunc = function () { };
    emptyFunc.prototype = this.prototype;
    bound.prototype = new emptyFunc();
    return bound
}