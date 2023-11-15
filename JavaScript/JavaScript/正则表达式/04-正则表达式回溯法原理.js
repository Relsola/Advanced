// .* 是非常影响效率的
// 为了减少一些不必要的回溯，可以把正则修改为 [^"]*
{
    console.log(/".*"/g.exec(`"acd"ef`)[0]);
    console.log(/"[^"]*"/g.exec(`"acd"ef`)[0]);
}


/* 
  正则表达式匹配字符串的这种方式，有个学名，叫回溯法。
    本质上就是深度优先搜索算法。其中退到之前的某一步这一过程，我们称为“回溯”。
    可以看出，路走不通时，就会发生“回溯”。即尝试匹配失败时，接下来的一步通常就是回溯。
*/

{
    // 贪婪量词
    const string = "12345";
    const regex = /(\d{1,3})(\d{1,3})/;
    console.log(string.match(regex));
    // ["12345", "123", "45", index: 0, input: "12345"]
    // 前面的 \d{1,3} 匹配的是"123"，后面的 \d{1,3} 匹配的是"45"
}

{
    // 惰性量词
    const string = "12345";
    const regex = /(\d{1,3}?)(\d{1,3})/;
    console.log(string.match(regex));
    // ["1234", "1", "234", index: 0, input: "12345"]

    const reg = /^(\d{1,3}?)(\d{1,3})$/;
    console.log(string.match(reg)); // 会出现回溯
    // [ '12345', '12', '345', index: 0, input: '12345']
}


{
    // 分支结构
    // 可能前面的子模式会形成了局部匹配，如果接下来表达式整体不匹配时，仍会继续尝试剩下的分支。这种尝试也可以看成一种回溯。
    const string = "candy"
    const regex = /^(?:can|candy)$/
    console.log(string.match(regex)); // 会出现回溯
    // [ 'candy', index: 0, input: 'candy']
}