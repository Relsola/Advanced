/* 
    ES6提出了promise 主要是为了解决异步问题
       异步问题具体是指
       异步代码和同步代码 先执行同步代码 后执行异步代码
       所以 一旦一个代码块中出现了异步代码，代码的执行顺序就和我们代码的书写顺序不一样
       所以实际上我们想解决的问题是 书写顺序和执行顺序不一致的问题

    每个Promise对象有三种状态：等待态 成功态  失败态
    对于一个promise对象来说，当我们成功或失败后 不能再对其进行转换 只能从等待态到成功态，或者失败态


    Promise 的立即执行函数有两个参数  resolve 和 reject
      第一个参数(resolve) 将promise变成成功态
      第二个参数(reject) 将promise变成失败态


    resolve的参数有三种情况
        1. 普通的数据 会让promise对象变成成功态 数据就是终值
        2. promise对象 此时promise成功还是失败 取决于内部promise是成功还是失败
        3. thenable(当做一个不完整的promise对象) 外面的p1是成功还是失败 取决于内部的thenable是成功还是失败
    
    
    
    

    then函数
       可以用来处理我们成功态的promise或者失败的promise的后续工作
       每一个promise对象都有一个then函数
       这个then函数有两个参数，都是函数
       第一个函数表示成功后的回调函数
       第二个函数表示失败后的回调函数
       这两个参数函数都有一个阐述，表示接受终值
       当你的promise对象不出现状态改变的时候 就不会有后续的操作
       then的返回值也是一个promise对象
*/



const result = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ then(resolve, reject) { resolve("成功") } })
    }, 2000)
})

result.then(res => {
    throw res
}, err => {
    console.log("err...", err);
}).then(res => {
    console.log("res...", res);
}, err => {
    console.log("err...", err);
})


// catch 捕获失败的promise
result.then(res => {
    throw res
}).catch(err => {
    console.log("err...", err);
})



// Promise 其他方法

result.finally(() => { }) // 不管你成功还是失败 最终都会执行

Promise.resolve() // 创建一个成功的promise对象

Promise.reject() // 创建一个失败的promise对象

Promise.all([]).then() // 所有的promise都成功后得到所有的promise成功的结果

Promise.allSettled([]).then() // 得到所有promise的结果 不管成功还是失败

Promise.race([]).then() // 等待第一个promise有结果 不管成功或失败

Promise.any() // 得到最先成功的promise 或者得到所有promise都失败