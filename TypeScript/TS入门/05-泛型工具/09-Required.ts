// Required将类型的属性变成必选
{
    // 定义
    type Required<T> = {
        // -? 移除可选
        [K in keyof T]-?: T[K]
    }

    interface UserInfo {
        id?: number;
        name?: string;
    }

    const tom: Required<UserInfo> = { id: 1, name: "tom" }
}