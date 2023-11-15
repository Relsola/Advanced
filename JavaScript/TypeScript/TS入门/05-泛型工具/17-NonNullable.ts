// NonNullable<T> 的作用是用来过滤类型中的 null 及 undefined 类型。

{
	// 定义
	type NonNullable<T> = T extends null | undefined ? never : T;
	// type NonNullable<T> = Exclude<T, undefined | null>

	type T0 = NonNullable<string | number | undefined>; // string | number
	type T1 = NonNullable<string[] | null | undefined>; // string[]
}
