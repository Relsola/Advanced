/* 
  实际上，在大多数的情况下使用接口类型和类型别名的效果等价
  但是在某些特定的场景下这两者还是存在很大区别。
  
  TypeScript 的核心原则之一是对值所具有的结构进行类型检查
  而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。
  
  type(类型别名)会给一个类型起个新名字
  type 有时和 interface 很像，
  但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型
  起别名不会新建一个类型
  它创建了一个新 名字来引用那个类型
  给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。


    1. 接口可以定义多次,会被自动合并为单个接口。
       类型别名不可以

    2. 接口只能给对象指定类型
       类型别名可以为任意类型指定别名

    3. 接口通过 extends 关键字进行继承
       类型别名的扩展就是交叉类型，通过 & 来实现。
    
    4. type可以使用in 关键字生成映射类型
       interface不行

  建议：公共的用 interface 实现，不能用 interface 实现的再用 type 实现
*/

// interface
{
	interface Point {
		x: number;
	}

	interface Point {
		y: number;
	}

	interface SetPoint {
		(x: number, y: number): void;
	}

	const point: Point = { x: 1, y: 2 };
}

// Type
{
	// primitive
	type Name = string;

	// object
	type PartialPointX = { x: number };
	type PartialPointY = { y: number };
	type SetPointType = (x: number, y: number) => void;

	// union
	type PartialPoint = PartialPointX | PartialPointY;

	// tuple
	type Data = [number, string];

	// dom
	let div = document.createElement("div");
	type B = typeof div;

	// 映射
	type Keys = "name" | "age";
	type DudeType = {
		[key in Keys]: string | number;
	};
	const tom: DudeType = {
		name: "Tom",
		age: 18
	};
}

{
	/* 
      扩展
        两者的扩展方式不同，但并不互斥
        接口可以扩展类型别名，同理，类型别名也可以扩展接口

        接口的扩展就是继承，通过 extends 来实现
        类型别名的扩展就是交叉类型，通过 & 来实现
    */
	{
		// 接口扩展接口
		interface PointX {
			x: number;
		}

		interface Point extends PointX {
			y: number;
		}

		let point: Point = { x: 1, y: 2 };
	}

	{
		// 类型别名扩展类型别名
		type PointX = { x: number };
		type Point = PointX & { y: number };
		let point: Point = { x: 1, y: 2 };
	}

	{
		// 接口扩展类型别名
		type PointX = { x: number };
		interface Point extends PointX {
			y: number;
		}
	}

	{
		// 类型别名扩展接口
		interface PointX {
			x: number;
		}
		type Point = PointX & { y: number };
	}
}
