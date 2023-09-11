// 手写AJAX
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status) {
        // ...
        console.log(xhr.response);
    } else {
        // ...
        new Error(xhr.statusText)
    }
};
xhr.open("GET", url, true);
xhr.send();


// 使用Promise封装AJAX
function ajax(methods, url, data) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) resolve(xhr.responseText);
            else reject(xhr.statusText);
        };
        xhr.open(methods, url);
        xhr.send(data)
    })
}

ajax('GET', '/get').then(data => {
    // AJAX成功，拿到响应数据
    console.log(data);
}).catch(status => {
    // AJAX失败，根据响应码判断失败原因
    new Error(status)
});


/* 
  open(method,url,async) 方法 规定 请求的类型、URL 以及 是否异步处理请求。
    method：请求的类型；GET 或 POST
    url：文件在服务器上的位置
    async：true（异步）或 false（同步），默认值为true
    
  send(string) 方法 将请求发送到服务器。
    string：仅用于 POST 请求
    如果需要像获取 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
    xhr.open("POST",url,true); 
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
    xhr.send("fname=Henry&lname=Ford");


  设置状态监听函数
    当请求被发送到服务器时，我们需要执行一些基于响应的任务，处理服务器响应。
    每当 readyState 改变时，就会触发 onreadystatechange 事件。
    readyState 属性存有 XMLHttpRequest 的状态信息。
    XMLHttpRequest 对象的三个重要的属性：
      onreadystatechange - 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。

      readyState - 存有 XMLHttpRequest 的状态。请求状态 从 0 到 4 发生变化。
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
        
      status - HTTP响应码
        200: "OK"
        404: 未找到页面
        等
    
    每当 readyState 发生变化时就会调用 onreadystatechange 函数。
    当 readyState 等于 4 且状态为 200 时，表示响应已就绪：
*/