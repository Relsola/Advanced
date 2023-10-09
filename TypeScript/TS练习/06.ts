{
	// 定义 ArrayFlat 工具类型，把数组类型扁平化

	type ArrayFlat<T extends any[]> = T extends (infer P)[]
		? P extends any[]
			? ArrayFlat<P>
			: P
		: never;

	type OneResult = ArrayFlat<[["a"], ["b", "c"], ["d"]]>;
	// => "a" | "b" | "c" | "d"

	// 实现 DeepFlat 工具类型，以支持多维数组类型
	type Deep = [["a"], ["b", "c"], [["d"]], [[[["e"]]]]];

	type DeepResult = ArrayFlat<Deep>;
	// => DeepTestResult: "a" | "b" | "c" | "d" | "e"
}
