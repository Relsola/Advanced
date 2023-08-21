const arr = [];
const ary = new Array(10);

arr[0] = 10; // 修改赋值

for (const item of arr) {
    // 遍历值
}

for (const key in arr) {
    // 遍历key/index
}

// push 在数组末尾添加一个或多个元素 返回新的数组长度。
// unshift() 方法将指定元素添加到数组的开头，并返回数组的新长度。
// pop 弹出数组最后一个 并返回该元素的值
// shift() 方法从数组中删除第一个元素，并返回该元素的值。

// sort() 就地对数组的元素进行排序，并返回对相同数组的引用
// toSorted() 方法是 sort() 方法的复制方法版本。它返回一个新数组，其元素按升序排列。
// reverse() 方法就地反转数组中的元素，并返回同一数组的引用
// Array.isArray() 静态方法用于确定传递的值是否是一个 Array。
// Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。

// 数组常用方法
// Array.slice(起始索引，终止索引) 返回新数组
// Array.concat(要被合并的数组) 返回新数组
// Array.join() 作用：把数组转换为字符串
// Array.includes  返回布尔
// Array.find(item => item) 返回查找的元素 没有返回undefined
// Array.findIndex(item => item) 查找元素对应的索引
// Array.map(item => item) 返回新数组
// Array.filter(item => item) 返回新数组
// Array.reduce((pre,cur) => cur , 初始值)
// Array.at(-1) 返回该索引对应的元素
// Array.fill(0,2,4) 方法用一个固定值填充一个数组中从起始索引（默认为 0）
// Array.flat() 返回新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中

// Array.of() 静态方法通过可变数量的参数创建一个新的 Array 实例，而不考虑参数的数量或类型。
// Array.with(index, value) 方法是使用方括号表示法修改指定索引值的复制方法版本。它会返回一个新数组，其指定索引处的值会被新值替换。