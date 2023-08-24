{
    // Array  对数组类型的定义有两种方式：
    const arr: string[] = ['1', '2'];

    const arr2: Array<number> = [1, 2];

    const arr3: (string | number)[] = [1, "2"];

    const arr4: Array<string | number> = ["1", 2];

    console.log(arr);
    console.log(arr2);
    console.log(arr3);
    console.log(arr4);
}

{
    // 定义指定对象成员的数组：
    interface Test {
        name: string,
        age: number
    }

    const arr: Test[] = [{ name: "张三", age: 17 }];

    const arr2: Array<Test> = [{ name: "李四", age: 21 }];

    console.log(arr);
    console.log(arr2);
}