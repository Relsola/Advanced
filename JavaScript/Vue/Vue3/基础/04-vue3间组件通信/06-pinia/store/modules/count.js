import { defineStore } from "pinia"

export default defineStore("count", {
    // v2里面的state是一个对象
    // v3里面的state是一个函数
    state: () => ({ num: 7 }),

    // getters
    getters: {
        getNum() {
            return this.num
        },

        getDoubleNum() {
            return this.getNum << 1
        }
    },

    // actions
    // 之前v2里面的action推荐写异步
    // v3中不管同步异步 都写到action里面
    actions: {
        numAdd(val) { this.num += val },
        numReduce(val) { this.num -= val }
    }
})