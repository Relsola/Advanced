<>
    <form action="" id="info">
        <input type="text" name="username" />
    </form>
</>

// 一、将form表单作为参数 直接传入
function getInfo() {

    const xhr = new XMLHttpRequest();
    const fromEle = document.querySelector("#info");

    xhr.responseType = "json"
    xhr.onload = function () {
        console.log(xhr.response);
    }

    xhr.open("post", "http://....")
    xhr.setRequestHeader('Content-Type', 'application/json')

    const fromData = new FormData(fromEle);
    xhr.send(fromData)
}


// 二、通过容器.append往里面塞数据
function getInfo() {

    const xhr = new XMLHttpRequest();
    const fromData = new FormData();

    xhr.responseType = "json"
    xhr.onload = () => {
        console.log(xhr.response);
    }
    xhr.open("post", "http://...");
    xhr.setRequestHeader('Content-Type', 'application/json');

    fromData.append("name", "zhangsan");
    xhr.send(fromData);
}



/* 
   FormData 对象的方法
     1. get(key) 与 getAll(key) 获取相对应的值
     2. append(key,value) 在数据末尾追加数据
     3. set(key, value) 设置修改数据
     4. has(key) 判断是否存在对应的 key 值
     6. delete(key) 删除数据
     7. entries() 获取一个迭代器，然后遍历所有的数据
*/