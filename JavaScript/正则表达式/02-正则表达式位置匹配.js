// 在ES5中，共有6个锚字符：^  $  \b  \B  (?=p)  (?!p)

/* 
  ^ 和 $
  ^（脱字符）匹配开头，在多行匹配中匹配行开头。
  $（美元符号）匹配结尾，在多行匹配中匹配行结尾。
*/
{
    // 把字符串的开头和结尾用"#"替换（位置可以替换成字符的！）
    const result = "hello".replace(/^|$/g, "#")
    console.log(result);
}

{
    // 多行匹配模式时，二者是行的概念
    const result = "I\nlove\njavascript".replace(/^|$/gm, "#")
    console.log(result);
}


/* 
  \b 和 \B
  \b是单词边界，具体就是\w和\W之间的位置，也包括 \w和^ \w和$ 之间的位置。
  \B就是\b的反面的意思，非单词边界。\w与\w、\W与\W、^与\W，\W与$之间的位置。
*/

{
    const result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
    console.log(result); // [#JS#] #Lesson_01#.#mp4#
}

{
    const result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
    console.log(result);
    // => "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"

}

/* 
  (?=exp) 和 (?!exp)
  (?=exp)，其中p是一个子模式，即p前面的位置。
  (?!exp)就是(?=exp)的反面意思

  ES6中，还支持positive lookbehind和negative lookbehind
  具体是(?<=exp)和(?<!exp)
*/
{
    const result = "hello".replace(/(?=l)/g, '#');
    console.log(result); // "he#l#lo"
}

{
    const result = "hello".replace(/(?!l)/g, '#');
    console.log(result); // "#h#ell#o#"
}



// 位置的特性  对于位置的理解，我们可以理解成空字符
// 比如"hello"字符串等价于如下的形式：
{
    console.log("hello" === "" + "h" + "" + "e" + "" + "l" + "" + "l" + "o" + "");
    console.log("hello" === "" + "" + "hello");

    // 因此，把/^hello$/写成/^^hello?$/，是没有任何问题的
    const result = /^^hello?$/.test("hello");
    console.log(result); // true
}

{
    // 甚至可以写成更复杂的
    const result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
    console.log(result); // true
}


// 相关案例
{
    // 不匹配任何东西的正则
    const regex = /.^/;
    // 因为此正则要求只有一个字符，但该字符后面是开头。
}

{
    // 数字的千位分隔符表示法  "12345678" -> "12,345,678"
    const regex = /\B(?=(\d{3})+\b)/g;
    const string = "12345678 123456789";
    console.log(string.replace(regex, ","));
}

{
    // 验证密码问题
    // 密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符。
    const reg = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,12}$/;
    const regex = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/;
    console.log(reg.test("1234567")); // false 全是数字
    console.log(reg.test("abcdef")); // false 全是小写字母
    console.log(reg.test("ABCDEFGH")); // false 全是大写字母
    console.log(reg.test("ab23C")); // false 不足6位
    console.log(reg.test("ABCDEF234")); // true 大写字母和数字
    console.log(reg.test("abcdEF234")); // true 三者都有
}