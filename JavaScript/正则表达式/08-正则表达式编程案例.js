// 1 使用构造函数生成正则表达式

/* 
  我们知道要优先使用字面量来创建正则，但有时正则表达式的主体是不确定的，此时可以使用构造函数来创建。
  模拟getElementsByClassName方法，就是很能说明该问题的一个例子。
  这里getElementsByClassName函数的实现思路是：
    比如要获取className为"high"的dom元素
    首先生成一个正则：/(^|\s)high(\s|$)/
    然后再用其逐一验证页面上的所有dom元素的类名，拿到满足匹配的元素即可。
*/

{
    const getElementsByClassName = className => {
        const elements = document.getElementsByTagName("*");
        const regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
        const result = [];
        for (const element of elements)
            if (regex.test(element.className)) result.push(element);
        return result;
    }
}



// 2 使用字符串保存数据
{
    const utils = {};
    "Boolean|Number|String|Function|Array|Date|RegExp|Object|Error".split("|").forEach(item => {
        utils["is" + item] = obj =>
            Object.prototype.toString.call(obj) === "[object " + item + "]"
    });
    console.log(utils);
    console.log(utils.isArray([1, 2, 3])); // true
}



// 3 if语句中使用正则替代&&
{
    // 比如，模拟ready函数，即加载完毕后再执行回调（不兼容ie的）
    const readyRE = /complete|loaded|interactive/;
    const ready = callback => {
        if (readyRE.test(document.readyState) && document.body) callback();
        else document.addEventListener(
            'DOMContentLoaded',
            () => { callback() },
            false
        );
    };
}



// 4 使用强大的replace
/* 
  因为replace方法比较强大，有时用它根本不是为了替换，只是拿其匹配到的信息来做文章。
  这里以查询字符串（querystring）压缩技术为例
  注意下面replace方法中，回调函数根本没有返回任何东西。
*/
{
    const compress = source => {
        const keys = new Map();
        source.replace(/([^=&]+)=([^&]*)/g, (_, key, value) => {
            keys.set(key, (keys.has(key) ? keys.get(key) + "," : "") + value);
        });
        const result = [];
        for (const [key, value] of keys)
            result.push(`${key}=${value}`);

        return result.join('&');
    }
    console.log(compress("a=1&b=2&a=3&b=4")); // "a=1,3&b=2,4"
}
