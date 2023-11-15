// 正则表达式是匹配模式，要么匹配字符，要么匹配位置。

/* 
  一 两种模糊匹配
    1. 横向模糊匹配
       横向模糊指的是，一个正则可匹配的字符串的长度不是固定的，可以是多种情况的。
       其实现的方式是使用量词。譬如{m,n}，表示连续出现最少m次，最多n次。
*/

{
  const regex = /ab{2,5}c/g
  const string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
  console.log(string.match(regex)); // [ 'abbc', 'abbbc', 'abbbbc', 'abbbbbc' ]
}


/* 
  2. 纵向模糊匹配
     纵向模糊指的是，一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能。
     其实现的方式是使用字符组。譬如[abc]，表示该字符是可以字符“a”、“b”、“c”中的任何一个。
*/
{
  const regex = /a[123]b/g;
  const string = "a0b a1b a2b a3b a4b";
  console.log(string.match(regex)); // ["a1b", "a2b", "a3b"]
}



// 二 字符组  虽叫字符组（字符类），但只是其中一个字符
/* 
  1. 范围表示法
     [1-6a-fG-M] 用连字符-来省略和简写
     因为连字符有特殊用途，那么要匹配“a”、“-”、“z”这三者中任意一个字符
     可以写成 [-az]或[az-]或[a\-z] 即要么放在开头，要么放在结尾，要么转义。
  
  2. 排除字符组
     [^abc]，表示是一个除"a"、"b"、"c"之外的任意一个字符。
     字符组的第一位放^（脱字符），表示求反的概念。
  
  3. 常见的简写形式
     \d  [0-9]
     \D  [^0-9]
     \w  [0-9a-zA-Z_]
     \W  [^0-9a-zA-Z_]
     \s  [ \t\v\n\r\f]
     \S  [^ \t\v\n\r\f]
     匹配任意字符  [\d\D]、[\w\W]、[\s\S] 和 [^]
*/


// 三 量词  量词也称重复。{m,n}
/* 
  1 简写形式
    {m,} 至少出现m次
    {m} 等价于{m,m}，表示出现m次
    ? 等价于{0,1}，表示出现或者不出现
    + 等价于{1,}，表示出现至少一次
    * 等价于{0,}，表示出现任意次，有可能不出现
   
  2 贪婪匹配和惰性匹配
    通过在量词后面加个问号就能实现惰性匹配
    {m,n}?  {m,}?  ??  +?  *?
*/
{
  const regex = /\d{2,5}/g;
  const string = "123 1234 12345 123456";
  console.log(string.match(regex)); // ["123", "1234", "12345", "12345"]
}

{
  const regex = /\d{2,5}?/g;
  const string = "123 1234 12345";
  console.log(string.match(regex)); // ["12", "12", "34", "12", "34"]
}


/* 
  四 多选分支 
    一个模式可以实现横向和纵向模糊匹配。而多选分支可以支持多个子模式任选其一
    分支结构是惰性的，即当前面的匹配上了，后面的就不再尝试了
*/

{
  const regex = /good|nice/g;
  const string = "good idea, nice try.";
  console.log(string.match(regex)); // ["good", "nice"]
}

{
  const regex = /good|goodbye/g;
  const string = "goodbye";
  console.log(string.match(regex)); // ["good"]
}

{
  const regex = /goodbye|good/g;
  const string = "goodbye";
  console.log(string.match(regex)); // ["goodbye"]
}



// 五 案例
{
  // 匹配16进制颜色值  #ffbbad #Fc01DF #FFF #ffE
  const regex = /#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})/g
  const string = "#ffbbad #Fc01DF #FFF #ffE";
  console.log(string.match(regex));
}

{
  // 匹配时间  23:59  02:07
  const regex = /^(0?\d|1\d|2[0-3]):(0?\d|[1-5]\d)$/
  console.log(regex.test("23:59"), regex.test("02:07"), regex.test("7:9"));
}

{
  // 匹配日期  2017-06-10
  const regex = /^\d{4}-(0\d|1[0-2])-(0[1-9]|[12]\d|3[01])/g;
  console.log(regex.test("2017-06-10"));
}

{
  // window操作系统文件路径
  // F:\study\javascript\regex\regular expression.pdf
  // F:\study\javascript\regex\
  // F:\study\javascript
  // F:\

  const regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/
  console.log(regex.test("F:\\study\\javascript\\regex\\regular expression.pdf"));
  console.log(regex.test("F:\\study\\javascript\\regex\\"));
  console.log(regex.test("F:\\study\\javascript"));
  console.log(regex.test("F:\\"));
}

{
  // 匹配id   <div id="container" class="main"></div>
  // const regex = /id=".*?"/g
  const regex = /id="[^"]*"/g
  const string = '<div id="container" class="main"></div>';
  console.log(string.match(regex));
}