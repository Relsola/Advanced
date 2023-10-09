{
	// 本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

	function fn<T extends string | number>(a: T, b: T) {
		if (typeof a === "string") {
			return a + ":" + b;
		} else if (typeof a === "number") {
			return (a as number) + (b as number);
		} else {
			const check: never = a;
			return "";
		}
	}
	fn(2, 3); // Ok
	// f(1, 'a'); // Error
	// f('a', 2); // Error
	fn("a", "b"); // Ok
}

{
	const isStrArr = (a: string[] | number[]): a is string[] =>
		typeof a[0] === "string";

	function f(...arg: string[] | number[]) {
		if (isStrArr(arg)) {
			return arg[0] + ":" + arg[1];
		} else {
			return arg[0] + arg[1];
		}
	}

	f(2, 3); // Ok
	// f(1, 'a'); // Error
	// f('a', 2); // Error
	f("a", "b"); // Ok
}
