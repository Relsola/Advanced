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


// 获取节点类型
{
    nodeType
    // 元素节点类型是1
    document.body.nodeType // 1

    // 注释节点的类型是8

    // 文本节点的类型是3
}

// 获取节点名字
{
    // nodeName  获取节点名字
    document.body.nodeName // #comment #text DIV

    // TagName 获取标签元素的名字 只有元素标签才可以获取到名字
    document.body.tagName //  DIV(大写) / undefined
}

// 获取节点内容
{
    innerHTML // 可以获取到元素内部的内容，可以解析HTML标签
    outerHTML // outerHTML包含元素自身 innerHTML只能获取子元素不包括自身
    textContent // 只能识别文本
    nodeValue // 用于获取非元素节点的文本内容
    document.body.hidden = true // 隐藏
}

// 节点的创建和挂载
{
    // 创建一个元素
    document.createElement('span')

    // 挂载元素
    // 把创建好的span元素挂载到father元素里
    father.append(h11); // 挂载在father节点内部的尾部
    father.prepend(h11); // 挂载在father节点内部的头部

    //同一个元素只能挂载一次，后面的会覆盖掉前面的
    father.before(h11); // 挂载在father节点外部的头部
    father.after(h11); // 挂载在father节点外部的尾部
}

// 操作节点
{
    removeChild() // 删除子元素
    remove() // 删除元素自己

    replaceChild() // 替换节点

    cloneNode(false) // 浅克隆，只克隆当前元素，不克隆子元素
    cloneNode(true)  // 深克隆，克隆当前元素及其子元素

    hasAttribute() // 检测这个元素上满有没有这个属性 返回布尔值
    getAttribute() // 通过属性名来获取属性值
    setAttribute() // 设置属性值
    removeAttribute() // 删除属性
    attributes // 得到元素身上的所有属性 是一个对象
    // 特殊情况 在input中，property和attribute不相通 input里面使用property 
}