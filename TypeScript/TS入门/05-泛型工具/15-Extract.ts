// Extract<T, U> 的作用是从 T 中提取出 U。
{
	// 定义
	type Extract<T, U> = T extends U ? T : never;

	type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
	type T1 = Extract<string | number | (() => void), Function>; // () =>void
}
