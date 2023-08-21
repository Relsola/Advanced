// 动态修改class
{
    classList.add() // 添加一个类名
    classList.remove() // 删除一个类名
    classList.toggle() // 类名存在就删除，不存在就添加
    classList.contains() // 检查类名是否存在 返回布尔值
}

// 动态修改样式
{
    /* 
     box.style.color = '#823345'
     box.style.fontSize = '22px'
     box.style.opacity='.1'
    */

    // 只有行内样式可以通过style.xxx找到
    getComputedStyle() // 全局函数可以获取到style标签里面的样式和外部引入的样式
}

