const arr = [1, 2, [1, 2, [{ a: 1 }, [1]]], [], 7, [7, [8, [1, 3, ["he"]], "hello"]], "world"];

{
    // 1.常用，简洁 -------------------------------------------------------
    console.log(arr.flat(Infinity)); // 123456
}

{
    // 2.常用 reduce
    const f1 = (arr) =>
        arr.reduce((prev, next) => prev.concat(Array.isArray(next) ? f1(next) : next), [])
    console.log(f1(arr));
}

{
    // 3.递归 -------------------------------------------------------
    const f2 = (arr) => {
        let result = [];
        arr.forEach(element => {
            result = result.concat(Array.isArray(element) ? f2(element) : element)
        });
        return result
    }
    console.log(f2(arr));

    const f3 = (arr) => {
        const result = [];
        const fn = (arr, result) => {
            arr.forEach(item => {
                Array.isArray(item) ? fn(item, result) : result.push(item)
            })
        }
        arr.forEach(item => {
            Array.isArray(item) ? fn(item, result) : result.push(item)
        })
        return result
    }
    console.log(f3(arr));
}

{
    // 4.扩展运算符 -------------------------------------------------------
    const f4 = (arr) => {
        arr = [...arr]
        while (arr.some(i => Array.isArray(i))) {
            arr = [].concat(...arr)
        }
        return arr
    }
    console.log(f4(arr));
}

{
    // 限制类型 且对里面的空数组无能为力 -------------------------------------------------------
    console.log(arr.toString().split(/,,?/g).map(i => Number(i)));

    console.log(JSON.parse(JSON.stringify(arr).replace(/(?!^\[|\]$)(?:\[\]?,?|\])/g, "")));
}