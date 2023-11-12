<template>
    <div :style="{ width }">
        <input :value="result" @input="search" @keyup.prevent="handle" />
        <div class="context">
            <div v-for="item in SearchResult" :key="item" @click="select" ref="select" class="search-item">{{ item }}</div>
        </div>
    </div>
</template>

<script>
const getArray = val =>
    new Promise(resolve => {
        setTimeout(() => {
            const arr = Array.from(new Array(20), (_, v) => `wx11${++v}`);
            resolve(arr.filter(item => item.includes(val)));
        });
    });

export default {
    name: "Search",
    model: {
        prop: "result",
        event: "getResult"
    },
    props: {
        result: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: "100%"
        }
    },
    data: () => ({
        haveResult: false,
        SearchResult: [],
        index: -1
    }),
    methods: {
        async search({ target: { value } }) {
            value = value.trim();
            this.$emit("getResult", value);
            if (value.length < 3) {
                this.SearchResult = [];
                return;
            }
            const result = await getArray(value);
            this.index = -1;
            this.SearchResult = result;
        },
        handle({ key }) {
            const nodes = this.$refs.select;
            if (nodes === void 0 || nodes.length === 0) {
                this.index = -1;
                return;
            }
            const n = nodes.length;
            if (key === "ArrowUp") {
                if (this.index <= 0) {
                    return;
                }
                nodes[this.index--].classList.remove("search-item-select");
                this.addClass(nodes, this.index);
            }
            if (key === "ArrowDown") {
                if (this.index === -1) {
                    nodes[++this.index].classList.add("search-item-select");
                    return;
                }
                if (this.index === n - 1) {
                    return;
                }
                nodes[this.index++].classList.remove("search-item-select");
                this.addClass(nodes, this.index);
            }
            if (key === "Enter" && this.index >= 0) {
                nodes[this.index].click();
            }
        },
        select({ target: { textContent } }) {
            this.$emit("getResult", textContent);
            // this.haveResult = true;
            this.hide();
        },
        hide() {
            // if (!this.haveResult) {
            //     this.$emit("getResult", "");
            // }
            this.SearchResult = [];
            this.index = -1;
        },
        addClass(nodes, index) {
            nodes[index].classList.add("search-item-select");
            nodes[index].scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }
};
</script>

<style>
.context {
    overflow: auto;
    height: 100px;
}

.search-item {
    border: 1px solid #000;
}

.search-item:hover {
    background-color: skyblue;
}

.search-item-select {
    background-color: skyblue;
}
</style>
