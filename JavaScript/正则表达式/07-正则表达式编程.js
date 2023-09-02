// 1. 正则表达式的四种操作

{
    // 验证
    const regex = /\d/;
    const string = "abc123";

    // search
    console.log(string.search(regex) !== -1); // true

    // test  ---常用
    console.log(regex.test(string)); // true

    // match
    console.log(string.match(regex) !== null); // true

    // exec
    console.log(regex.exec(string) !== null); // true
}


{
    // 切分  split
    {
        const regex = /,/;
        const string = "html,css,javascript";
        console.log(string.split(regex)); // ["html", "css", "javascript"]
    }

    {
        const regex = /\D/;
        console.log("2017/06/26".split(regex)); // ["2017", "06", "26"]
        console.log("2017.06.26".split(regex)); // ["2017", "06", "26"]
        console.log("2017-06-26".split(regex)); // ["2017", "06", "26"]
    }
}


{
    // 提取
    const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
    const string = "2017-06-26";

    // match --- 常用
    console.log(string.match(regex));
    // ["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

    // test
    regex.test(string);
    console.log(RegExp.$1, RegExp.$2, RegExp.$3); // "2017" "06" "26"

    // search
    string.search(regex);
    console.log(RegExp.$1, RegExp.$2, RegExp.$3); // "2017" "06" "26"

    // replace
    const date = [];
    string.replace(regex, (match, year, month, day) => {
        date.push(year, month, day);
    });
    console.log(date); // [ '2017', '06', '26' ]
}


{
    // 替换

    const string = "2017-06-26";
    const today = new Date(string.replace(/-/g, "/"));
    console.log(today); // 2017-06-25T16:00:00.000Z
}


/* 
   2. 相关API注意要点
     从上面可以看出用于正则操作的方法，共有6个，字符串实例4个，正则实例2个：
     String#search
     String#split
     String#match
     String#replace
     RegExp#test
     RegExp#exec
*/

{
    console.log(1 + "-------------------------");
    // 1. search和match的参数问题
    // 字符串实例的那4个方法参数都支持正则和字符串。但search和match，会把字符串转换为正则。

    const string = "2017.06.27";

    console.log(string.search(".")); // 0
    //需要修改成下列形式之一
    console.log(string.search("\\.")); // 4
    console.log(string.search(/\./)); // 4


    console.log(string.match(".")); // ["2", index: 0, input: "2017.06.27"]
    //需要修改成下列形式之一
    console.log(string.match("\\.")); // [".", index: 4, input: "2017.06.27"]
    console.log(string.match(/\./)); // [".", index: 4, input: "2017.06.27"]


    console.log(string.split(".")); // ["2017", "06", "27"]

    console.log(string.replace(".", "/")); // "2017/06.27"
}

{
    console.log(2 + "-------------------------");
    // 2. match返回结果的格式问题  与正则对象是否有修饰符g有关

    const string = "2017.06.27";
    const regex1 = /\b(\d+)\b/;
    const regex2 = /\b(\d+)\b/g;
    console.log(string.match(regex1));
    // ["2017", "2017", index: 0, input: "2017.06.27"]
    console.log(string.match(regex2)); // ["2017", "06", "27"]
}

{
    console.log(3 + "-------------------------");
    // 3 exec比match更强大
    // 当正则没有g时，使用match返回的信息比较多。但是有g后，就没有关键的信息index了。
    // 而exec方法就能解决这个问题，它能接着上一次匹配后继续匹配：

    const string = "2017.06.27";
    const regex = /\b(\d+)\b/g;
    let result;
    while (result = regex.exec(string)) {
        console.log(result, regex.lastIndex);
    }
    // ["2017", "2017", index: 0, input: "2017.06.27"] 4
    // ["06", "06", index: 5, input: "2017.06.27"] 7
    // ["27", "27", index: 8, input: "2017.06.27"] 10
}

{
    console.log(4 + "-------------------------");
    // 4 修饰符g，对exec和test的影响

    // 正则实例的两个方法exec、test，当正则是全局匹配时，每一次匹配完成后，都会修改lastIndex

    let regex = /a/g;

    console.log(regex.test("a"), regex.lastIndex); // true 1
    console.log(regex.test("aba"), regex.lastIndex); // true 3
    console.log(regex.test("abab"), regex.lastIndex); // false 0


    // 如果没有g，自然都是从字符串第0个字符处开始尝试匹配
    regex = /a/;
    console.log(regex.test("a"), regex.lastIndex); // true 0
    console.log(regex.test("aba"), regex.lastIndex); // true 0
    console.log(regex.test("abab"), regex.lastIndex); // true 0
}


{
    console.log(5 + "-------------------------");
    // 5 test整体匹配时需要使用^和$
    console.log(/123/.test("a123b")); // true
    console.log(/^123$/.test("a123b")); // false
    console.log(/^123$/.test("123")); // true
}


{
    console.log(6 + "-------------------------");
    // 6 split相关注意事项
    // 第一，它可以有第二个参数，表示结果数组的最大长度
    const string = "html,css,javascript";
    console.log(string.split(/,/, 2)); // ["html", "css"]

    // 第二，正则使用分组时，结果数组中是包含分隔符的
    console.log(string.split(/(,)/)); // ["html", ",", "css", ",", "javascript"]
}


{
    console.log(7 + "-------------------------");
    // 7 replace是很强大的
    /*
      当第二个参数是字符串时，如下的字符有特殊的含义：
        $1,$2,...,$99 匹配第1~99个分组里捕获的文本
        $& 匹配到的子串文本
        $` 匹配到的子串的左边文本
        $' 匹配到的子串的右边文本
        ? 美元符号
    */
    const result = "2+3=5".replace(/=/, "$&$`$&$'$&");
    console.log(result); // "2+3=2+3=5=5"

    // 当第二个参数是函数时，我们需要注意该回调函数的参数具体是什么
    "1234 2345 3456".replace(/(\d)\d{2}(\d)/g, (match, $1, $2, index, input) => {
        console.log([match, $1, $2, index, input]);
    });
    // ["1234", "1", "4", 0, "1234 2345 3456"]
    // ["2345", "2", "5", 5, "1234 2345 3456"]
    // ["3456", "3", "6", 10, "1234 2345 3456"]
}


{
    console.log(8 + "-------------------------");
    // 8 使用构造函数需要注意的问题
    // 一般不推荐使用构造函数生成正则，而应该优先使用字面量。因为用构造函数会多写很多\

    const string = "2017-06-27 2017.06.27 2017/06/27";
    let regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/g;
    console.log(string.match(regex));
    // ["2017-06-27", "2017.06.27", "2017/06/27"]

    regex = new RegExp("\\d{4}(-|\\.|\\/)\\d{2}\\1\\d{2}", "g");
    console.log(string.match(regex));
    // ["2017-06-27", "2017.06.27", "2017/06/27"]
}


{
    console.log(9 + "-------------------------");
    // 9 修饰符
    /*
      g 全局匹配，即找到所有匹配的，单词是global
      i 忽略字母大小写，单词ignoreCase
      m 多行匹配，只影响^和$，二者变成行的概念，即行开头和行结尾。单词是multiline
    */

    // 字面量正则对象相应属性只读
    const regex = /\w/img;
    regex.ignoreCase = regex.multiline = regex.global = false;
    console.log(regex.global); // true
    console.log(regex.ignoreCase); // true
    console.log(regex.multiline); // true
}

{
    console.log(10 + "-------------------------");
    // 10 source属性
    /*
      正则实例对象属性，除了global、ignoreCase、multiline、lastIndex属性之外
      还有一个source属性。
      在构建动态的正则表达式时，可以通过查看该属性，来确认构建出的正则到底是什么
    */

    const className = "high";
    const regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
    console.log(regex.source) // "(^|\\s)high(\\s|$)"
    console.log(regex.toString()) // "/(^|\\s)high(\\s|$)/"
    console.log(regex.valueOf()) // (^|\\s)high(\\s|$)
}


{
    console.log(11 + "-------------------------");
    // 11 构造函数属性
    /*
      构造函数的静态属性基于所执行的最近一次正则操作而变化。
      除了是$1,...,$9之外，还有几个不太常用的属性（有兼容性问题）：
      RegExp.input 最近一次目标字符串，简写成RegExp["$_"]
      RegExp.lastMatch 最近一次匹配的文本，简写成RegExp["$&"]
      RegExp.lastParen 最近一次捕获的文本，简写成RegExp["$+"]
      RegExp.leftContext 目标字符串中lastMatch之前的文本，简写成RegExp["$`"]
      RegExp.rightContext 目标字符串中lastMatch之后的文本，简写成RegExp["$'"]
    */

    const regex = /([abc])(\d)/g;
    const string = "a1b2c3d4e5";
    string.match(regex);

    console.log(RegExp.input); // "a1b2c3d4e5"
    console.log(RegExp["$_"]); // "a1b2c3d4e5"

    console.log(RegExp.lastMatch); // "c3"
    console.log(RegExp["$&"]); // "c3"

    console.log(RegExp.lastParen); // "3"
    console.log(RegExp["$+"]); // "3"

    console.log(RegExp.leftContext); // "a1b2"
    console.log(RegExp["$`"]); // "a1b2"

    console.log(RegExp.rightContext); // "d4e5"
    console.log(RegExp["$'"]); // "d4e5"
}