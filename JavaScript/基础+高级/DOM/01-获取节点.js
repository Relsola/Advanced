// 获取节点
{
    // document 是一个对象 挂载在window对象上
    window.document

    // 第一个子节点
    document.body.firstChild

    // 选择节点后面的一个兄弟节点
    document.body.nextSibling

    // 拿到父节点
    document.body.parentNode

    // 拿到第一个 元素 子节点
    document.body.firstElementChild

    // 拿到下一个 元素 子节点
    document.body.nextElementSibling

    // 获取子节点(伪数组)
    document.body.children

    // body下面的所有子节点  包含了注释 换行 文本...
    document.body.childNodes
}


// 节点类型
{
    nodeType
    // 元素节点类型是1
    document.body.nodeType // 1

    // 注释节点的类型是8

    // 文本节点的类型是3
}

{
    // nodeName  获取节点名字
    document.body.nodeName // #comment #text DIV

    // TagName 获取标签元素的名字 只有元素标签才可以获取到名字
    document.body.tagName //  DIV(大写) / undefined
}

{
    innerHTML // 可以获取到元素内部的内容，可以解析HTML标签
    outerHTML // outerHTML包含元素自身 innerHTML只能获取子元素不包括自身
    textContent // 只能识别文本
    nodeValue // 用于获取非元素节点的文本内容
    document.body.hidden = true // 隐藏
}

