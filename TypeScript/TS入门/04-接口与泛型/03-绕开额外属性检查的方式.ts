// 一. 鸭式辨型法
{
	/*
      下面代码，在参数里写对象就相当于是直接给labeledObj赋值
      这个对象有严格的类型定义，所以不能多参或少参。
      
      而当你在外面将该对象用另一个变量myObj接收
      myObj不会经过额外属性检查
      但会根据类型推论为let myObj: { size: number; label: string } = { size: 10, label: "Size 10 Object" };
      
      然后将这个myObj再赋值给labeledObj
      此时根据类型的兼容性，两种类型对象，参照鸭式辨型法，因为都具有label属性，所以被认定为两个相同，故而可以用此法来绕开多余的类型检查。
    */

	interface LabeledValue {
		label: string;
	}

	function printLabel(labeledObj: LabeledValue) {
		console.log(labeledObj.label);
	}

	let myObj = { size: 10, label: "Size 10 Object" };
	printLabel(myObj); // OK

	// printLabel({ size: 10, label: "Size 10 Object" }); // Error
}

// 二. 类型断言
{
	/* 
      类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么
      此时程序自然就不会再进行额外的属性检查了。
    */
	interface Props {
		name: string;
		age: number;
		money?: number;
	}

	let p: Props = {
		name: "张三",
		age: 25,
		money: -100000,
		girl: false
	} as Props; // OK
}

// 三. 索引签名
{
	interface Props {
		name: string;
		age: number;
		money?: number;
		[key: string]: boolean | string | number | undefined;
	}

	let p: Props = {
		name: "张三",
		age: 25,
		money: -100000,
		girl: false,
		once: 123
	}; // OK
}
