// 一、基本使用
axios({ method: "POST/GET", url: "..." }).
    then(result => { console.log(result) });


// 二、请求传参
const url = "http://..."
axios.get(url, { params: { id: 1 } }).
    then(result => { console.log(result); });

axios.post(url, { id: 1 }).
    then(result => { console.log(result); });




// 三、创建axios实例  --------------------------------------
const request = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {}
})

request.get("/get").then(result => { console.log(result); });

request({
    method: "get",
    url: "/get",
    params
}).then(result => { console.log(result); });

request({
    method: "post",
    url: "/post",
    data
}).then(result => { console.log(result); });



// 响应请求拦截器 -----------------------------------------------
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('请求出去了');
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status == 200) {
        console.log('响应回来了');
        return response.data
    } else {
        return '请求有误'
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('请求有误');
    return Promise.reject(error);
});
