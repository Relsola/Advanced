/* 
    Math 数学相关的方法
        // console.log(Math.PI);圆周率
        //Math.floor（） 对小数向下取整
        //Math.ceil()    对小数向上取整
        //Math.round(3.4)对小数进行四舍五入取整
        //Math.random()随机0-1，包含0，不包含1
*/

/* 
     Date 日期
        const date1 = new Date() // Fri Apr 07 2023 14:22:26 GMT+0800 

        const timer = Date.now(); // 时间戳 1680848627004

        const date2 = new Date('2023-02-09') // 加引号一定要以-隔开

        //获取时间戳 时间戳是以毫秒来计算的 1s=1000ms
        const date5 = new Date().getTime()
        
        const date6 = new Date().getMonth() + 1 // 返回的是0-11月，对应1-12月

        const date7 = new Date(1680849608800) //将时间戳转换为标准时间格式
*/

/* 
    字符串
        访问字符串的方式1 
          1.字符串加索引  字符串[索引]
          2.字符串.charAt(索引)
         
        for of  遍历字符串 

        toLocaleUpperCase()) 转大写
        toLocaleLowerCase()) 转小写

        操作字符串
        startsWith() 判断是否以这个子串为开头
        endsWith() 判断是否以这个子串为结尾
        trim() 去掉前后空格
        split() 将字符串转为数组
*/

/* 
   对象 是属性的无序集合
      键名 in 对象 存在就是true 不存在false
      delete obj.key 删除对象中的属性值
*/