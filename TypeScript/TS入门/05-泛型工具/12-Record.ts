// Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

{
    // 定义
    type Record<K extends keyof any, T> = {
        [P in K]: T
    };


    type Info = Record<string, string | number>;
    const tom: Info = {
        id: 1,
        name: "tom",
        age: 17
    };


    interface PageInfo { title: string };
    type Page = "home" | "about" | "contact";

    const x: Record<Page, PageInfo> = {
        about: { title: "about" },
        contact: { title: "contact" },
        home: { title: "home" },
    };
}