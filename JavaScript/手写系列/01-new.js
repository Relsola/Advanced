function myNew(constructor, ...arg) {
	// 改变obj原型指向
	const obj = Object.create(constructor.prototype);
	// 将obj作为上下文this指向
	const result = constructor.apply(obj, arg);
	// 正确输出结果
	return result !== null && typeof result === "object"
		? result
		: obj;
}

function Person(id, name) {
	this.id = id;
	this.name = name;
	return new Error();
}

console.log(new Person(1, "2"));
console.log(myNew(Person, 1, "2"));
