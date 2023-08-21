// 鼠标事件
{
    "click" // 鼠标单击事件

    "dblclick" // 鼠标双击事件

    "mouseup" // 鼠标抬起事件

    "mousedown" // 鼠标按下事件

    "mouseover" // 鼠标移入事件

    "mouseout" // 鼠标移出事件

    "mousemove" // 鼠标在元素上移动

    "contextmenu" // 鼠标右键触发的事件
}


// 键盘事件
{
    "keydown" // 键盘按下事件

    "onkeyup" // 键盘抬起事件

    "keypress" // 键盘抬入事件

    // keydown按任意键都可以触发 keypress shift ctrl alt  Tab都不会触发
}


// 其他事件
{
    "onload" // 加载事件 当我们网页所有资源加载完毕时，会触发load事件

    "DOMcontentLoaded" // 当页面元素加载完毕触发，不会等外部加载

    "focus" // 获取焦点

    "blur" // 失去焦点

    "change" // 内容发生改变且失去焦点

    "input" // 内容发生改变但没有失去焦点

    "submit" // 提交按钮只能在表单中，所以需要通过表单触发 事件源必须是一个form

    "reset" // 重置按钮，默认事件是清空表单

    "scroll" // 窗口滚动事件

    "resize" // 当浏览器窗口大小改变时触发
}


// DOM2级别事件 事件监听器  事件池 可以多次绑定，不会覆盖掉 推荐
but.addEventListener("事件", 回调函数); // 添加
but.removeEventListener("事件", 回调函数); // 移除

// html级别的事件， 写在标签内
<button onclick="fn()">点击</button>

//  DOM0级别事件 重复绑定会覆盖掉 优先级高于html事件绑定
btn.onclick = function () { console.log('onclick..') }

// DOM0的事件解绑
btn.onclick = null

