import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },

    mutations: {
        numAdd(state, payload) {
            state.count += payload
        },

        numReduce(state, payload) {
            state.count -= payload
        }
    },

    actions: {
        async numAddAsync(context, payload) {
            const result = new Promise(resolve => {
                setTimeout(() => {
                    payload >> 1 >= 3 ? resolve(3) : resolve(payload)
                }, 2000)
            })
            await result
            context.commit("numAdd", payload)
        }
    },

    getters: {
        // 第一个参数是 state
        // 第二个参数是 所有的getter

        left: state => state.count << 1,

        right: (state, getters) => state.count + getters.left ^ 1
    }
});

export default store;
