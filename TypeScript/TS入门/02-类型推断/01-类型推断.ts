{
	/* 
       在很多情况下，TypeScript 会根据上下文环境自动推断出变量的类型
       无须我们再写明类型注解
       我们把 TypeScript 这种基于赋值表达式推断类型的能力称之为类型推断


       在 TypeScript 中
       具有初始化值的变量、有默认值的函数参数、函数返回的类型
       都可以根据上下文推断出来
       比如我们能根据 return 语句推断函数返回的类型

       注意： 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
    */

	{
		let str: string = "this is string";
		let num: number = 1;
		let bool: boolean = true;
	}

	{
		let str = "this is string"; // 等价
		let num = 1; // 等价
		let bool = true; // 等价
	}

	// ---------------------------------------------------------

	{
		const str: string = "this is string";
		const num: number = 1;
		const bool: boolean = true;
	}

	{
		const str = "this is string"; // 不等价
		const num = 1; // 不等价
		const bool = true; // 不等价
	}

	// ---------------------------------------------------------

	{
		const add1 = (a: number, b: number) => a + b;
		const x1 = add1(1, 1); // 推断出 x1 的类型也是 number

		const add2 = (a: number, b = 1) => a + b;
		const x2 = add2(1);
		// const x3 = add2(1, "1") // Error
	}
}
