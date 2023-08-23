// 使用async修饰一个函数后，这个函数的返回值就变成了一个promise对象

async function fun1() {
    return 123
}

console.log(fun1()); // Promise { 123 }
fun1().then(res => { console.log(res); }) // 123

async function fun2() {
    return new Promise(resolve => { resolve("321") })
}
console.log(fun2()); // Promise { <pending> }
fun2().then(res => { console.log(res); }) // 321


async function fun3() {
    return { then(resolve, reject) { reject("777") } }
}
console.log(fun3()); // Promise { <pending> }
fun3().catch(err => { console.log(err) }) // 777

async function fun4() {
    throw "aaa"
}
console.log(fun4()); // Promise { <rejected> 'aaa' }
fun4().catch(err => { console.log(err) }) // aaa



console.log(1);
setImmediate(() => { console.log(2) });
const fn = async () => {
    const result = await new Promise(resolve => {
        setTimeout(() => {
            console.log(3);
            resolve(4)
        }, 2000)
    })
    console.log(result);
    console.log(5);
}
fn()
console.log(6);

// 1 6 2 3 4 5 

/*  
    任务环
    先同步 后异步

    异步代码里也分顺序
    定时器 监听 promise.then 

    异步代码分两种
    宏任务： 定时器 事件监听
    微任务    promise.then
*/