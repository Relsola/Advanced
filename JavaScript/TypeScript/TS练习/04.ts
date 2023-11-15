{
	// 如何定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下：

	interface Example {
		a: string;
		e: number;
		b: string | number;
		c: () => void;
		d: {};
		f: string | number | boolean;
	}
	type ConditionalPick<V, T> = {
		[K in keyof V as V[K] extends T ? K : never]: V[K];
	};

	// 测试用例：
	type StringKeysOnly = ConditionalPick<Example, string>; // => {a: string}

	type Test = ConditionalPick<Example, string | number>;
	// => {a: string; e: number; b: string | number}
}
