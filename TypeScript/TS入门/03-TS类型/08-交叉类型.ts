/* 
  交叉类型是将多个类型合并为一个类型
  这让我们可以把现有的多种类型叠加到一起成为一种类型
  它包含了所需的所有类型的特性，使用&定义交叉类型。
*/

{
	type useLess = string & number; // never

	/*
       如果我们仅仅把原始类型、字面量类型、函数类型等原子类型合并成交叉类型
       是没有任何用处的
       因为任何类型都不能满足同时属于多种原子类型
       因此，在上述的代码中，类型别名 Useless 的类型就是个 never。
    */

	/*
      交叉类型真正的用武之地就是将多个接口类型合并成一个类型
      从而实现等同接口继承的效果，也就是所谓的合并接口类型
    */

	type t = { id: number; name: string } & { age: number };
	const m1: t = { id: 1, name: "张三", age: 18 };
}

// 其他......................................
{
	/* 
      如果合并的多个接口类型存在同名属性
        如果同名属性的类型不兼容 never
        如果同名属性的类型兼容 类型就是两者中的子类型
        属性是非基本数据类型 可以成功合并

    
    */

	// 1. 同名属性的类型不兼容
	type One = { id: number; name: 2 } & {
		age: number;
		name: number;
	};
	// const obj:One = { id: 1, name: "string", age: 2 } //Error
	// 'string' 类型不能赋给 'never' 类型

	// 2. 同名属性的类型兼容
	type Tow = { id: number; name: 2 } & {
		age: number;
		name: number;
	};
	// number & 2  --> 子类型 2
	const obj: Tow = {
		id: 1,
		name: 2, // OK
		// name: 18, // Error
		age: 18
	};

	// 3. 属性是非基本数据类型
	interface A {
		x: { d: true };
	}
	interface B {
		x: { e: string };
	}
	interface C {
		x: { f: number };
	}
	type ABC = A & B & C;

	const abc: ABC = { x: { d: true, e: "", f: 666 } }; // OK
}
