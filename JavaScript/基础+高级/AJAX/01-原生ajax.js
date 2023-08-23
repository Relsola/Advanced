// 1. 创建一个请求对象(xhr对象)
const xhr = new XMLHttpRequest();

// 设置响应的是json类型的 此时后端响应回来的即使是json字符串也会转成对象
xhr.responseType = "json"


// 2. 监听变化（一个请求从创建到发送 有四种状态）
xhr.onreadystatechange = function () {
    console.log(xhr.response); // 响应体
    console.log(xhr.readyState); // HTTP 请求的状态。
    // 如果后端响应的是xml类型 那么dom对象在 responseXML 中
    console.log(xhr.responseXML);
};

// onload 事件 这个事件会等你在请求调用完成后直接执行
xhr.onload = function () {
    console.log(xhr.response);
};


// 3. 配置网络请求
xhr.open("post", "http://....");


// 使用post请求传参 需要设置请求头
// Content-Type 默认值是text/plain
// 你需要告诉服务器 你传递的是什么类型
xhr.setRequestHeader('Content-Type', 'application/json')


// 4. 发送请求
xhr.send(JSON.stringify(obj));

/* 
   拓展...
     1. status 由服务器返回的 HTTP 状态代码
     2. statusText 这个属性用名称而不是数字指定了请求的 HTTP 的状态代码。
     3. timeout  超时时间，毫秒数。

     4. abort() 取消当前响应，关闭连接并且结束任何未决的网络活动。
     5. getAllResponseHeaders() 把 HTTP 响应头部作为未解析的字符串返回。
     6. getResponseHeader() 返回指定的 HTTP 响应头部的值。其参数是要返回的 HTTP 响应头部的名称。

     事件监听
       1.  progress(加载进度)
       2.  load(请求完成并接受到服务器返回结果)
       3.  error(请求错误)
       4.  abort(终止请求)。
*/


