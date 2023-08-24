/* 
  在 TypeScript 中，我们可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合，这就是 "Type Narrowing"。
*/

{
    // 类型守卫
    const func = (anything: any) => {
        if (typeof anything === "string") return anything
        else if (typeof anything === 'number') return anything
        return null
    }

    // 同样，我们可以使用类型守卫将联合类型缩小到明确的子类型
    const fun = (anything: string | number) => {
        if (typeof anything === "string") return anything
        else if (typeof anything === 'number') return anything
    }
}


{
    // 通过字面量类型等值判断（===）或其他控制流语句（包括但不限于 if、三目运算符、switch 分支）将联合类型收敛为更具体的类型

    type Goods = "pen" | "pencil" | "ruler"

    const getConst = (item: Goods) => {
        if (item === 'pen') {
            item; // item => 'pen'
        } else {
            item; // => 'pencil' | 'ruler'
        }
    }

    interface UploadEvent {
        type: 'upload'
        filename: string
        contents: string
    }

    interface DownloadEvent {
        type: "download"
        filename: string
    }

    type AppEvent = UploadEvent | DownloadEvent

    function handleEvent(e: AppEvent) {
        switch (e.type) {
            case "download":
                e // Type is DownloadEvent 
                break;
            case "upload":
                e // Type is UploadEvent 
                break;
        }
    }
}