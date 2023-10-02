import Vue from "./index.js";

Vue.mixin({
	created() {
		console.log("我是全局混入的created");
	}
});

const vm = new Vue({
	el: "#app",

	data: () => ({
		num: 11,
		arr: [1, 2, 3]
	}),

	components: {
		Demo: {
			data: () => ({
				msg: "Hello Vue"
			}),
			template: `<h1>我是子组件 &nbsp; {{ msg }}</h1>`
		}
	},

	computed: {
		getTenNum() {
			return this.num * 10;
		}
	},

	watch: {
		num: {
			deep: true,
			handler(newValue, oldValue) {
				console.log("newValue", newValue);
				console.log("oldValue", oldValue);
			}
		}
	},

	beforeCreate() {
		console.log("beforeCreate");
	},

	created() {
		console.log("我是自己的created");
	},

	beforeMount() {
		console.log("beforeMount");
	},

	mounted() {
		console.log("mounted");
	}
});

window.add = function () {
	vm.num++;
};

window.reduce = function () {
	vm.num--;
};

window.push = function () {
	vm.arr.push((vm.arr.at(-1) ?? 0) + 1);
};

window.pop = function () {
	vm.arr.pop();
};

console.log(vm);
