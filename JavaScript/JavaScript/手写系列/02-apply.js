Function.prototype.apply2 = function (context, rest) {
    // 判断传入的this，为空时要赋值为window或global
    if (!context) context = typeof window === undefined ? global : window;
    // 为了避免冲突 用Symbol
    const key = Symbol("key");
    // 获取调用call的函数，用this可以获取
    context[key] = this;
    // 改变this指向，执行上下文
    const result = context[key](...rest);
    // 删除键
    delete context[key];
    return result;
}