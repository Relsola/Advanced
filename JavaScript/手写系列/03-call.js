Function.prototype.call2 = function (context, ...arg) {
    // 判断传入的this，为空时要赋值为window或global
    if (!context) context = typeof window === undefined ? global : window;
    // 为了避免冲突 用Symbol
    const key = Symbol("key");
    // 改变this指向，执行上下文
    context[key] = this;
    const result = context[key](...arg);
    // 删除键 输出结果
    delete context[key];
    return result
}