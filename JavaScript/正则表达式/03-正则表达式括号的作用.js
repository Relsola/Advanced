/* 
  括号的作用
    1. 分组和分支结构
    2. 捕获分组
    3. 反向引用
    4. 非捕获分组
*/

// 1. 分组和分支结构
{
    // 分组
    const regex = /(ab)+/g;
    const string = "ababa abbb ababab";
    console.log(string.match(regex)); // ["abab", "ab", "ababab"]
}

{
    // 分支结构
    const regex = /^I love (JavaScript|Regular Expression)$/;
    console.log(regex.test("I love JavaScript")); // true
    console.log(regex.test("I love Regular Expression")); // true
}


// 2. 引用分组  进行数据提取，以及更强大的替换操作
{
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const string = "2017-06-12";

    regex.test(string); // 正则操作即可，例如
    //regex.exec(string);
    //string.match(regex);

    console.log(RegExp.$1); // "2017"
    console.log(RegExp.$2); // "06"
    console.log(RegExp.$3); // "12"

    const [, year, month, day] = regex.exec(string)
    console.log(month + "/" + day + "/" + year);

    console.log(string.replace(regex, "$2/$3/$1"));
}


// 3. 反向引用
{
    const regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
    const string1 = "2017-06-12";
    const string2 = "2017/06/12";
    const string3 = "2017.06.12";
    const string4 = "2016-06/12";
    console.log(regex.test(string1)); // true
    console.log(regex.test(string2)); // true
    console.log(regex.test(string3)); // true
    console.log(regex.test(string4)); // false
}

{
    // 括号嵌套以左括号（开括号）为准
    const regex = /^((\d)(\d(\d)))\1\2\3\4$/;
    const string = "1231231233";
    console.log(regex.test(string)); // true
    console.log(RegExp.$1); // 123
    console.log(RegExp.$2); // 1
    console.log(RegExp.$3); // 23
    console.log(RegExp.$4); // 3
}

{
    // 引用不存在的分组 此时正则不会报错，只是匹配反向引用的字符本身
    const regex = /\1\2\3\4\5\6\7\8\9/;
    console.log(regex.test("\1\2\3\4\5\6\7\8\9"));
    console.log( "\1\2\3\4\5\6\7\8\9".split(""));
}


// 4. 非捕获分组
// 如果只想要括号最原始的功能，但不会引用它，即既不在API里引用，也不在正则里反向引用。此时可以使用非捕获分组(?: p)
{
    const regex = /(?:ab)+/g;
    const string = "ababa abbb ababab";
    console.log(string.match(regex)); // ["abab", "ab", "ababab"]
}


// 相关案例
{
    // 字符串trim方法模拟  去掉字符串的开头和结尾的空白符
    String.prototype.trim = function () {
        // return this.valueOf().replace(/^\s*(.*?)\s*$/g,"$1");
        return this.valueOf().replace(/^\s+|\s+$/g, "");
    }
    console.log("  foobar  ".trim());
}


{
    // 将每个单词的首字母转换为大写
    String.prototype.titleSize = function () {
        return this.valueOf().toLowerCase().
            replace(/(?:^|\s)\w/g, c => c.toUpperCase())
    }
    console.log("my name is tom".titleSize());
}


{
    // 驼峰化
    String.prototype.camelize = function () {
        return this.valueOf().replace(/[-_\s]+(.)?/g, (match, c) =>
            c !== undefined ? c.toUpperCase() : '');
    }
    console.log('-moz-transform'.camelize()); // "MozTransform"
}

{
    // 中划线化
    String.prototype.dasherSize = function () {
        return this.valueOf().
            replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, '-').toLowerCase()
    }
    console.log("MozTransform".dasherSize() === "-moz-transform");
}


{
    // html转义和反转义

    // 将HTML特殊字符转换成等值的实体
    function escapeHTML(str) {
        const escapeChars = {
            '¢': 'cent',
            '£': 'pound',
            '¥': 'yen',
            '€': 'euro',
            '©': 'copy',
            '®': 'reg',
            '<': 'lt',
            '>': 'gt',
            '"': 'quot',
            '&': 'amp',
            '\'': '#39'
        };
        const regex = new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g')
        return str.replace(regex, c => '&' + escapeChars[c] + ';');
    }
    console.log(escapeHTML('<div>Blah blah blah</div>'));
    // => "&lt;div&gt;Blah blah blah&lt;/div&gt";

    // 实体字符转换为等值的HTML。
    function unescapeHTML(str) {
        const htmlEntities = {
            nbsp: ' ',
            cent: '¢',
            pound: '£',
            yen: '¥',
            euro: '€',
            copy: '©',
            reg: '®',
            lt: '<',
            gt: '>',
            quot: '"',
            amp: '&',
            apos: '\''
        };
        return str.replace(/&([^;]+);/g, (match, key) => {
            if (key in htmlEntities) return htmlEntities[key];
            return match;
        });
    }
    console.log(unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;'));
    // => "<div>Blah blah blah</div>"
}


{
    // 匹配成对标签
    /*
      要求匹配： 
        <title>regular expression</title>
        <p>bye bye</p>
        
      不匹配：
        <title>wrong!</p>
    */

    const regex = /<([^>]+)>[\d\D]*<\/\1>/;
    const string1 = "<title>regular expression</title>";
    const string2 = "<p>bye bye</p>";
    const string3 = "<title>wrong!</p>";
    console.log(regex.test(string1)); // true
    console.log(regex.test(string2)); // true
    console.log(regex.test(string3)); // false
}