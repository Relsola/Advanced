/* 
    url的组成
        // https://www.baidu.com:443/admin?name="wang"#abc
        // https://协议
        //www.baidu.com   host 主机地址 通过主机地址去找ip地址
        // :443 https默认的端口号  http默认的是80端口
        // /admin 路径名 path
        // ?name="wang" search 查询字符串
        //#abc hash值 锚点
*/

// 全局对象
window / global

// 打开关闭窗口
const win = window.open('https://www.baidu.com') / win.close()

// outerHeight 整个浏览器的高度 innerHeight 窗口内容区的高度 不包含边框和菜单栏
window.outerHeight / window.innerHeight

// assign  打开一个新的URL 一个新窗口  有记录可以返回
location.assign('https://www.baidu.com');

// replace 替换 打开一个新的url同时替换掉原本网页 不会留下记录  不能返回
location.replace('https://www.baidu.com');

// reload 重新加载页面 强制刷新 会清除缓存
location.reload(true);



// history对象 允许我们访问浏览器曾经的历史会话记录
// 打开新页面
location.href = './out.html';

// 去到指定页面 传参数去到指定的页面
history.go(1);

// forward 只能去到下一页 不能传参数
history.forward();

// 回到上一页
history.back();


// navigator 对象表示用户代理的状态和标识
navigator


// screen 主要记录浏览器窗口外面的客户端显示器的信息
screen.width / screen.height


//sessionStorage 浏览器中有一部分储存空间 用来存储数据 临时存储
sessionStorage.setItem();
sessionStorage.getItem();
sessionStorage.removeItem();

// localStorage 不会随着页面关闭而清空，持久化存储
localStorage.setItem();
localStorage.getItem();
localStorage.removeItem();