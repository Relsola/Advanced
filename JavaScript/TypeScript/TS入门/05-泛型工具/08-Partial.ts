// Partial<T> 将类型的属性变成可选
{
	// 定义
	type Partial<T> = {
		[K in keyof T]?: T[K];
	};

	interface UserInfo {
		id: number;
		name: string;
	}

	const zhangsan: Partial<UserInfo> = { name: "zhangsan" };
}

// 但是 Partial<T> 有个局限性，就是只支持处理第一层的属性
{
	interface UserInfo {
		id: number;
		name: string;
		fruits: {
			appleNumber: number;
			orangeNumber: number;
		};
	}

	// const zhangsan: Partial<UserInfo> = { fruits: { orangeNumber: 1 } }
	// Error

	// 如果要处理多层，就可以自己实现
	type DeepPartial<T> = {
		// 如果是 object，则递归类型
		[K in keyof T]?: T[K] extends object
			? DeepPartial<T[K]>
			: T[K];
	};

	const zhangsan: DeepPartial<UserInfo> = {
		fruits: { orangeNumber: 1 }
	};
}
