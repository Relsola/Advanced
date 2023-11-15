{
    /*
      TypeScript 类型检测无法做到绝对智能，毕竟程序不能像人一样思考
      有时会碰到我们比 TypeScript 更清楚实际类型的情况
    
        通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
        通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”
        类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构
        它没有运行时的影响，只是在编译阶段起作用。
    
        通常使用 as 语法做类型断言

        第二种 尖括号 语法
        两种方式虽然没有任何区别，但是尖括号格式会与react中JSX产生语法冲突
        因此更推荐使用 as 语法。

    */


    // as 语法
    const arr: number[] = [1, 2, 3, 4, 5];
    // const greaterThan2: number = arr.find(num => num > 2); // Error
    const greaterThan2: number = arr.find(num => num > 2) as number


    //  尖括号 语法
    let val: any = "this is string";
    val = (<string>val).length;
}