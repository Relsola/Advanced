// client家族 只能获取 不能设置 不能改变
{
    // 获取盒子的 宽度 + 左右padding   
    clientWidth

    // 获取盒子的 高度 + 上下padding
    clientHeight

    // 获取盒子的上边框宽度
    clientTop

    // 获取盒子的左边框宽度
    clientLeft

    // 当前页面的宽度 可以获取浏览器当前页面的宽度
    document.body.clientWidth

    // 当前页面的高度 可以获取浏览器当前页面的高度
    document.body.clientHeight

    //获取一屏的宽度和高度
    document.documentElement.clientWidth
    document.documentElement.clientHeight
}


// offset家族 获取元素相对于父级元素的偏移量
{
    // 盒子 + padding + border 的长和高
    offsetWidth / offsetHeight

    // 相对于父元素左侧的偏移量
    offsetLeft

    // 相对于父元素顶部的偏移量
    offsetTop

    // 获取盒子定位的参考点
    offsetParent
}


// scroll家族 获取盒子可以滚动的高度
{
    // scrollHeight获取到的是真实的内容高度
    scrollHeight

    // 获取被卷上去的高度 可以设置
    scrollTop

    // 获取的是html标签卷上去的高度
    // 一个元素可以滚动的最大高度怎么计算？真实盒子的真实内容高度-当前父盒子的高度
    document.documentElement.scrollTop
}