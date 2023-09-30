{
	/* 
       元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。
       元祖用于保存定长定数据类型的数据

       注意，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]
    */

	let x: [string, number]; // 类型必须匹配且个数必须为2

	x = ["hello", 10]; // OK
	// x = ['hello', 10, 10]; // Error
	// x = [10, 'hello']; // Error

	console.log(x);
}

{
	// 解构赋值 可选元素
	type Tuple = [number, string?];

	const one: Tuple = [123, "123"];
	const two: Tuple = [123];

	console.log(one);
	console.log(two);
}

{
	/* 
       元组类型的剩余元素

       元组类型里最后一个元素可以是剩余元素
       形式为 ...X
       这里 X 是数组类型
       
       剩余元素代表元组类型是开放的，可以有零个或多个额外的元素
       例如，[number, ...string[]] 
       表示带有一个 number 元素和任意数量string 类型元素的元组类型。

       只读的元组类型
       为任何元组类型加上 readonly 关键字前缀，以使其成为只读元组。
       使用 readonly 关键字修饰元组类型之后
       任何企图修改元组中元素的操作都会抛出异常
    */

	type ResTuple = readonly [number, ...string[]];
	const rt1: ResTuple = [666, "99", "88"];
    console.log(rt1);
    // rt1[0] = 100
}
