// 抛出错误 和 捕获错误
{
    try {
        const str = '这是一个错误'
        throw str // 抛出
    } catch (error) {
        // catch捕获
        console.log(error);
    }
}

/* 
常见错误类型：
    1.未定义
    2.不是一个函数
    3.let 不能在初始化之前使用
    4.常量值不能改变
    5.超出最大执行栈
    6.无效参数
    7.const声明没有赋值错误
*/