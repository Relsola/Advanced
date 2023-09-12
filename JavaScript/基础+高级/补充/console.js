// table() 把数据 data 以表格的形式打印出来 对象会枚举
const data = [['name', 'Tom'], ['age', 18], ['gander', '男']];
console.table(data);


// dir() 在控制台中查看指定 JavaScript 对象的所有属性
// dirxml() 显示一个明确的 XML/HTML 元素的包括所有后代元素的交互树,如果无法作为一个 element 被显示，那么会以 JavaScript 对象的形式作为替代
console.dir(globalThis.document ?? "window");
console.dirxml(globalThis.document ?? "window");


// error() / warn() 向 Web 控制台输出一条错误 / 警号消息。
console.error({ a: 1 });
console.warn("{ a: 1 }");


// time() timeEnd() timeLog() 测量程序中某一特定操作所需的时间
console.time('for of');
let i = 0;
for (; i < 1000; i++) for (const _ of data);
console.timeLog('for of');
for (; i < 1000000; i++) for (const _ of data);
console.timeEnd('for of');

console.time('forEach');
i = 0;
for (; i < 1000; i++) data.forEach(() => { });
console.timeLog('forEach');
for (; i < 1000000; i++)  data.forEach(() => { });
console.timeEnd('forEach');


// trace() 可以帮助您在调用它的位置输出当前堆栈跟踪
function a() { b() };
function b() { (() => { c() })() };
function c() { console.trace() };
a();


// assert() 如果断言为 false，则将一个错误消息写入控制台。如果断言是 true，没有任何反应。
const num = 13;
console.assert(num > 10, 'Number must be greater than 10');
console.assert(num > 20, 'Number must be greater than 20');


// count() 记录调用 count(label?) 的次数  不传值默认 'default'
// countReset(label?) 重置count()计数器
for (let i = 0, str = 'div'; i <= 4;)
    i++ === 2 ? console.countReset(str) : console.count(str);


// log() info() debug() 都是让控制台输出消息，几乎没什么不同，用console.log就行
console.log('log'); // 支持的占位符
console.info('info');
console.debug('debug');


// group(label?), groupCollapsed(label?), and groupEnd()
//  接收一个参数label分组标签 缩进 折叠 回退缩进
console.groupCollapsed('label');
console.group('Lv1');
console.group('Lv2');
console.log("⭐");
console.groupEnd();
console.log("⭐⭐⭐");
console.groupEnd();
console.log("⭐⭐⭐⭐⭐");
console.groupEnd();
console.groupEnd();
console.log("⭐⭐⭐⭐⭐");


// 开始记录性能描述信息 有兼容等各种问题
console.profile("profileName"); // 启动性能分析
(() => [].map(_ => _ >> 1))(); // ...执行耗时操作
console.profileEnd("profileName"); // 停止性能分析


// console.memory  console对象的一个属性 用来查看当前内存的使用情况
console.log(console.memory);


// clear() 如果该控制台允许则清空控制台
console.clear();


// createTask() ... 自行探索
const fn = () => { console.log("'fn'run...") }
// 浏览器中有效 run...
// console.createTask(window.toString()).run(fn);  