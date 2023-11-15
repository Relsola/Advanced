const isObject = val => val !== null && typeof val === "object";
const toProxy = new WeakMap();

function reactive(obj) {
	if (!isObject(obj)) return obj;
	if (toProxy.has(obj)) return toProxy.get(obj);

	const observed = new Proxy(obj, {
		get(target, p, receiver) {
			const result = Reflect.get(target, p, receiver);
			// Proxy惰性劫持
			return isObject(result) ? reactive(result) : result;
		},
		set(target, p, value, receiver) {
			const result = Reflect.set(target, p, value, receiver);
			return result;
		},
		deleteProperty(target, p) {
			const result = Reflect.deleteProperty(target, p);
			return result;
		}
	});
	toProxy.set(obj, observed);
	return observed;
}

const obj = reactive({
	a: 10,
	b: { a: 10 }
});

// 获取
obj.a;
// 设置已存在属性
obj.a = 20;
// 设置不存在属性
obj.c = "10";
// 删除属性
delete obj.c;
// 嵌套对象
obj.b.a = 20;

/* 
 proxy数据劫持是惰性（用时）劫持， 性能要好很多
 proxy远比存取器劫持方式强大很多，支持删除属性、新增属性、属性检测、对象遍历等
 修改语法无限制（数组的用法与对象完全一致）
 Reflect相关的方法最后一个参数 receiver 是绑定this的意思
*/
