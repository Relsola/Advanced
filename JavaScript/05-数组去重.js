// 一. 基本数据类型去重
const arr = [1, 2, 2, 'abc', 'abc', true, true, false, false, undefined, undefined, NaN, NaN]

// 1. 利用Set()+Array.from() --------------------------------
{
    const result = Array.from(new Set(arr));
    console.log(result);
}

// 2. 利用数组的filter()+indexOf() --------------------------------
{
    // indexOf(NaN) = -1
    const result = arr.filter((item, index) => arr.indexOf(item) === index)
    console.log(result);
}

// 3. 利用Map() --------------------------------
{
    const map = new Map, result = [];
    // const map = new Map, result = arr.filter(item => !map.has(item) && map.set(item))
    arr.forEach(item => { if (!map.has(item)) map.set(item, result.push(item)) })
    console.log(result);
}

// 4. 利用数组的includes方法 --------------------------------
{
    const result = [];
    arr.forEach(item => { if (!result.includes(item)) result.push(item) })
    console.log(result);
}

// 4. Reduce
{
    const result = arr.reduce((pre, cur) => !pre.includes(cur) ? (pre.push(cur), pre) : pre, []);
    console.log(result);
}

{
    /* 
     pass: 1. 利用数组的indexOf 方法同includes
           2. 利用两层循环+数组的splice方法 很笨
           3. 利用对象 和Map()是差不多的，利用了对象的属性名不可重复这一特性。
           4. 递归 和Reduce 差不多
    
     */
}

// 二. 引用数据类型去重
const array = [{ a: 1, b: 2, c: 3 }, { b: 2, c: 3, a: 1 }, { d: 2, c: 2 }];

// 1. 先把对象中的key排序 再转成字符串遍历数组利用Set去重
{
    const result = [...new Set(
        array.map(item => Object.keys(item).sort()).
            map((item, index) => {
                const obj = {};
                for (const key of item) obj[key] = array[index][key];
                return obj;
            }).
            map(item => JSON.stringify(item)))].
        map(item => JSON.parse(item))
    console.log(result);
}

// 三. 更加复杂的情况
const s1 = Symbol(0), s2 = Symbol(0), ary = [
    { a: 1, b: 2, [s1]: 1 },
    { a: 1, b: 2 },
    { a: 1, b: 3 },
    { b: 1, a: 2 },
    { b: 2, a: 1, [s1]: 1 },
    { a: 1, b: 2, [s2]: 1 },
];

{
    // 判断是否相等
    function isEqual(val1, val2) {
        // 基础类型直接比较
        if (!isObject(val1) && !isObject(val2)) return val1 === val2;
        // 是否同类型
        if (!isSameType(val1, val2)) return false;
        // 取出复杂类型的键
        const val1keys = [
            ...Object.keys(val1),
            ...Object.getOwnPropertySymbols(val1),
        ];
        const val2Keys = [
            ...Object.keys(val2),
            ...Object.getOwnPropertySymbols(val2),
        ];
        if (val1keys.length !== val2Keys.length) return false;
        for (const key of val1keys) {
            // 键不等返回false
            if (!val2Keys.includes(key)) return false;
            // 值不等
            if (!isEqual(val1[key], val2[key])) return false;
        }
        return true;
    }

    // 判断是否是对象
    function isObject(val) {
        return typeof val === "object" && val !== null;
    }

    // 判断是否是相同类型
    function isSameType(a, b) {
        return (
            Object.prototype.toString.call(a) ===
            Object.prototype.toString.call(b)
        );
    }
    // console.log(isEqual(ary[0], ary[4]));
    // console.log(isEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 }));

    // 第一种, 根据某个键是否唯一
    const filterArrByParam = (arr, uniId = "a") => {
        const _arr = new Map();
        return arr.filter(
            item => !_arr.has(item[uniId]) && _arr.set(item[uniId], 1)
        );
    };

    // 对象数组去重 第二种
    function filterArr(arr) {
        const _arr = [...arr];
        for (let i = 0; i < _arr.length; i++) {
            for (let j = i + 1; j < _arr.length; j++) {
                if (isEqual(_arr[i], _arr[j])) {
                    _arr.splice(j, 1);
                    j--;
                }
            }
        }
        return _arr;
    }
    filterArr(ary)
    console.log(filterArr(ary));
}