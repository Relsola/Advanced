{
	// 如何定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的？

	// Partial<T>，它的作用是将某个类型里的属性全部变为可选项 ?
	// Required将类型的属性变成必选
	// Pick 从某个类型中挑出一些属性出来
	// Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
	type Simplify<T> = {
		[P in keyof T]: T[P];
	};

	type SetOptional<T, K extends keyof T> = Simplify<
		Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
	>;

	type Foo = {
		a: number;
		b?: string;
		c: boolean;
	};

	// 测试用例
	type SomeOptional = SetOptional<Foo, "a" | "b">;

	// type SomeOptional = {
	//     a?: number; // 该属性已变成可选的
	//     b?: string; // 保持不变
	//     c: boolean;
	// }
}

{
	// SetRequired 工具类型，利用它可以把指定的 keys 对应的属性变成必填的

	type Simplify<T> = {
		[P in keyof T]: T[P];
	};

	type SetRequired<T, K extends keyof T> = Simplify<
		Pick<T, Exclude<keyof T, K>> & Required<Pick<T, K>>
	>;

	type Foo = {
		a?: number;
		b: string;
		c?: boolean;
	};

	// 测试用例
	type SomeRequired = SetRequired<Foo, "b" | "c">;
	// type SomeRequired = {
	// 	a?: number;
	// 	b: string; // 保持不变
	// 	c: boolean; // 该属性已变成必填
	// }
}
