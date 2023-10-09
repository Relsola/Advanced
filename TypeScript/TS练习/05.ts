{
	// 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数。

	type Fn = (a: number, b: string) => number;

	type AppendArgument<F extends (...args: any) => any, A> = (
		x: A,
		...args: Parameters<F>
	) => ReturnType<F>;

	type FinalF = AppendArgument<Fn, boolean>;
	// => (x: boolean, a: number, b: string) => number
}

{
	type Fn = (a: number, b: string) => number;

	type AppendArgument<F, T> = F extends (...args: infer Args) => infer Return
		? (x: T, ...args: Args) => Return
		: never;

	type FinalFn = AppendArgument<Fn, boolean>;
	// => (x: boolean, a: number, b: string) => number
}

{
	/**
	 * 以函数类型 F，并新增以元组类型为 T 的多个前置参数构造新类型
	 */

	type Fn = (a: number, b: string) => number;

	// 定义非空元组约束类型
	type NonEmptyTuple = [unknown, ...unknown[]];

	// 非空元组类型
	type AppendArgument<F, T extends NonEmptyTuple> = F extends (
		...args: infer Args
	) => infer Return
		? (...args: [...T, ...Args]) => Return
		: never;

	type FinalFn = AppendArgument<Fn, [boolean, number]>;
	// => (args_0: boolean, args_1: number, args_2: number, args_3: string) => number
}
