// 根据旧的类型创建出新的类型, 我们称之为映射类型
{
	interface TestInterface {
		name: string;
		age: number;
	}
	// 我们可以通过 + / - 来指定添加还是删除

	type OptionalTestInterface<T> = {
		+readonly [p in keyof T]+?: T[p];
	};

	type newTestInterface = OptionalTestInterface<TestInterface>;

	// 等价于
	type newTestInterfaceType = {
		readonly name?: string;
		readonly age?: number;
	};
}
