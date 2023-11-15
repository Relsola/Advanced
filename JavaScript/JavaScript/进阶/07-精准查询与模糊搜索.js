// 测试用的数据
const staff = [
    { name: "April", job: "programmer", age: 18, hobby: "study" },
    { name: "Shawn", job: "student", age: 8, hobby: "study" },
    { name: "Leo", job: "teacher", age: 28, hobby: "play" },
    { name: "Todd", job: "programmer", age: 19, hobby: "sleep" },
    { name: "Scoot", job: "cook", age: 38, hobby: "painting" },
]


// 单条件精准查找 ----------------------------------
/*** 
* @param {Object} lists 所有数据
* @param {string} key 需要查询的数据的键值
* @param {string} value 需要查询的值
*/
function searchKeyValue(lists, key, value) {
    return lists.filter(item => item[key] == value);
}
console.log(searchKeyValue(staff, "job", "programmer"));


// 单条件多值精准查找 --------------------------------
/**
* @param {Object} lists 所有数据
* @param {string} key 需要查询的数据的键值
* @param {Array} valueArr 需要查询的值
*/
function searchKeyValues(lists, key, valueArr) {
    return lists.filter(item =>
        valueArr.find(i => i === item[key]) !== undefined
    );
}
console.log(searchKeyValues(staff, "job", ['programmer', 'student']));



// 多条件精准查找 -----------------------------------
/**
* @param {Object} lists 所有数据
* @param {Object} filters 需要查询的数据
*/
function searchKeysValue(lists, filters) {
    const keys = Object.keys(filters);
    return lists.filter(item => {
        for (const key of keys)
            if (item[key] !== filters[key])
                return false
        return true
    })
}
console.log(searchKeysValue(staff, { name: "April", hobby: "study" }));



// 多条件多值精准查找 -----------------------------------
/**
* @param {Object} lists 所有数据
* @param {Object} filters 需要查询的数据
*/
function searchKeysValues(lists, filters) {
    const keys = Object.keys(filters)
    const filter = {}
    for (const key of keys) {
        const map = new Map();
        for (const item of filters[key]) {
            map.set(item, true)
        }
        filter[key] = map
    }
    return lists.filter(item => {
        for (const key of keys) {
            if (!filter[key].has(item[key]))
                return false
        }
        return true
    })

}
console.log(searchKeysValues(staff, {
    age: [8, 19],
    hobby: ["study", "sleep"]
}));



// includes()模糊查询  -----------------------------------
/**
* @param {Object} lists 所有数据
* @param {Object} keyWord 查询的关键词
*/
function selectMatchItem(lists, keyWord) {
    keyWord = typeof keyWord === "string" ? keyWord : keyWord.toString()
    keyWord = keyWord.toLowerCase();

    return lists.filter(item => {
        for (const val of Object.values(item)) {
            if (typeof val === "string" && val.toLowerCase().includes(keyWord))
                return true;

            if (typeof val === "number" && val.toString().includes(keyWord))
                return true;
        }
        return false;
    })
}
console.log(selectMatchItem(staff, 8));



// 正则匹配模糊查询 -----------------------------------
/**
* @param {Object} lists 所有数据
* @param {Object} keyWord 查询的关键词
*/
function selectMatchItem(lists, keyWord) {
    const reg = new RegExp(keyWord);

    return lists.filter(item => {
        for (const val of Object.values(item))
            if (reg.test(val))
                return true
    })
}
console.log(selectMatchItem(staff, 8));