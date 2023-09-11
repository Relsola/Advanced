{
    // 创建

    // 1.构造函数创建  new RegExp('正则表达式','修饰符')
    const regex = new RegExp("hello", "igm");

    // 2.直接直面量创建  /正则表达式/修饰符
    const reg = /hello/igm;
}

{
    // 字符分类

    // 1.普通字符 字母、数字、下划线、汉字、没有特殊含义的符号（, ; !@等）
    // 实际上不是特殊字符的字符都是普通字符

    // 2.特殊字符
    // \：将特殊字符转义成普通字符


    // 3.模式修饰符
    // i：ignoreCase，匹配时忽视大小写
    // m：multiline，多行匹配
    // g：global，全局匹配
    // 字面量创建正则时，模式修饰符写在一对反斜线后
}

{
    // 实例方法
    {
        /*
         1.exec()
           用来匹配字符串中符合正则表达式的字符串
           如果匹配到，返回值是一个result数组:
           [匹配的内容，index: 在str中匹配的起始位置，input: 参数字符串，groups: undefined]
           否则返回null
       */

        const str = 'Hello world javascript hello';
        const reg = new RegExp('hello', 'igm');
        const res = reg.exec(str);
        console.log(res);
        /* 
          [
            'Hello',
            index: 0,
            input: 'Hello world javascript hello',
            groups: undefined
          ]
        */
    }


    {
        /*
          2.test()
            用来测试待检测的字符串中是否有可以匹配到正则表达式的字符串
            如果有返回true，否则返回false
        */
        const reg = /hello/;
        const str = 'hello world';
        console.log(reg.test(str));  //true
    }


    {
        /* 
          3.toSting() toLocaleString()
            把正则表达式的内容转化成字面量形式字符串/有本地特色的字符串
        */

        const reg = /hello/;
        console.log(reg.toString());   // /hello/
        console.log(reg.toLocaleString());   // /hello/
    }


    {
        // 4.valueOf()  返回正则表达式本身
        const reg = /hello/;
        const regex = new RegExp("HELLO");
        console.log(reg, regex);   // /hello/ /HELLO/
        console.log(reg.valueOf(), regex.valueOf());  // /hello/ /HELLO/
    }
}


{
    console.log("1.lastIndex....................");
    // 正则表达式实例属性
    {
        /* 
          1.lastIndex
            当没设置全局匹配时，该属性值始终为0
            设置了全局匹配时，每执行一次exec/test来匹配
            lastIndex就会移向匹配到的字符串的下一个位置
            当指向的位置后没有可以再次匹配的字符串时
            下一次执行exec返回null test执行返回false
            然后lastIndex归零，从字符串的开头重新匹配一轮
            可以理解成，每次正则查找的起点就是lastIndex 
        */

        const str = 'hello hello hello';
        const reg1 = /hello/; // 没设置全局匹配
        const reg2 = /hello/g; // 设置了全局匹配
        console.log(reg1.lastIndex);  // 0
        console.log(reg1.exec(str));  // 返回第一个hello
        console.log(reg1.lastIndex);  // 0

        console.log(reg2.lastIndex);  // 0
        console.log(reg2.exec(str));  // 返回第一个hello

        console.log(reg2.lastIndex);  // 5
        console.log(reg2.exec(str));  // 返回第二个hello

        console.log(reg2.lastIndex);  // 11
        console.log(reg2.exec(str));  // 返回第三个hello

        console.log(reg2.lastIndex);  // 17
        console.log(reg2.exec(str));  //返回 null

        console.log(reg2.lastIndex);  // 0
        console.log(reg2.exec(str));  // 返回第一个hello
    }


    {
        console.log("2.ignoreCase、global、multiline........");
        /* 
          2.ignoreCase、global、multiline
            判断正则表达式中是否有忽略大小写、全局匹配、多行匹配三个模式修饰符
        */
        const pattern = /hello/igm;
        console.log(pattern.ignoreCase); //true
        console.log(pattern.global); //true
        console.log(pattern.multiline); //true
    }


    {
        // 3.source  返回字面量形式的正则表达式（类似于toString）
        const pattern = /hello/igm;
        console.log(pattern.source);  // hello
    }
}


{
    // 正则表达式语法
    {
        /* 
          1.直接量字符 
            正则表达式中的所有字母和数字都是按照字面含义进行匹配的
            Javascript正则表达式语法也支持非字母的字符匹配
            这些字符需要通过反斜线\作为前缀进行转义。

             字符	           匹配
             字母和数字字符	   自身
             \o	               Null字符
             \t	               制表符
             \n	               换行符
             \v	               垂直制表符
             \f	               换页符
             \r	               回车符
        */

        const reg = /\n/;
        console.log(reg.test('hello \n world'));  //true
    }


    {
        console.log("2.字符集合..........................");
        /* 
          2.字符集合
            字符集合，也叫字符组。匹配集合中的任意一个字符
            可以使用连字符‘-’指定一个范围。
            
            [^xyz] 反义或补充字符集，也叫反义字符组
            匹配任意不在括号内的字符。也可以通过使用连字符 '-' 指定一个范围内的字符。
            
            注意：^写在[]里面是反义字符组
        */

        const reg1 = /[abc]/; //匹配括号中任意一个字母
        console.log(reg1.test('aaa hello world1'));  //true

        const reg2 = /[0-9]/; //匹配任意一个数字
        console.log(reg2.test('aaa hello world1')); //true

        const reg3 = /[^xyz]/; //包含xyz返回false 匹配除xyz之外的任何字符
        console.log(reg3.test('xyz'));  //false
    }


    {
        console.log("3.边界符...........................");
        /* 
          3.边界符
            ^ 匹配输入开始。表示匹配行首的文本（以谁开始)。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符后的开始处。
            
            $ 匹配输入结尾。表示匹配行尾的文本（以谁结束）。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符的前的结尾处。
            
            如果 ^和 $ 在一起，表示必须是精确匹配。
        */

        const rg = /abc/; // 只要包含有abc这个字符串返回的都满足
        console.log(rg.test('abcd')); //true

        const reg1 = /^bc/; // 必须是以bc开头的字符串才会满足
        console.log(reg1.test('abcd')); // false

        const reg2 = /ab$/; // 必须是以ab结尾的字符串才会满足
        console.log(reg2.test('abc')); // false

        const reg3 = /^abc$/; // 精确匹配 要求必须是 abc字符串才满足
        console.log(reg3.test('abc')); // true
    }


    {
        console.log("4.字符集与边界符一起使用.............");
        // 4.字符集与边界符一起使用

        const reg1 = /^[ab]$/; // 只有是a 或 b 才满足
        console.log(reg1.test('a')); //true
        console.log(reg1.test('b')); //true
        console.log(reg1.test('ab'), "-------------"); // false

        const reg2 = /^[0-9A-Za-z]$/; // 匹配任意一个字母或数字
        console.log(reg2.test('a')); //true
        console.log(reg2.test('A')); //true
        console.log(reg2.test('2')); //true
        console.log(reg2.test('ab'), "-------------"); //false

        const reg3 = /^[^0-9A-Za-z]$/; // ^反义字符 只要包含方括号内的字符，都返回 false
        console.log(reg3.test('a')); //false
        console.log(reg3.test('A')); //false
        console.log(reg3.test('2')); //false
        console.log(reg3.test('!')); //true
    }


    {
        console.log("5.零宽单词和非零宽单词的边界--------");
        /* 
          5.零宽单词和非零宽单词的边界
            \b 零宽单词边界 单词和空格之间位置 （取一个完整单词）
            \B单词边界和单词边界中间的位置 不匹配单词边界 （取某个单词中间部分）
        */

        const str = 'hello world javascript';

        const reg1 = /\bld\b/;
        console.log(reg1.exec(str)); //null

        const reg2 = /\bhello\b/;
        console.log(reg2.exec(str)); // 数组

        const reg3 = /\Bld\B/;
        console.log(reg3.exec(str)); //null

        const reg4 = /\Brl\B/;
        console.log(reg4.exec(str)); // 数组
    }


    {
        console.log(" 6.字符类-----------------------");
        /* 
          6.字符类
            将直接量字符单独放进方括号内就组成了字符类
            一个字符类可以匹配它所包含的任意字符。

        字符类          含义
        .     匹配除换行符\n和回车符之外的任何单个字符，等效于 [^\n\r]
        \d    匹配一个数字字符，等效于[0-9]
        \D    [^0-9]
        \w    匹配包括下划线的任何单个字符，[a-zA-Z0-9_]
        \W    [^a-zA-Z0-9_]
        \s    匹配任何Unicode空白字符,等效于[\f\t\n\r]
        \S    [^\f\t\n\r]

        * 记忆： d ==> digit（数字） s ==> space（空白） w ==> word（单词）
        */
        const reg = /./; // 匹配除\n\r 之外的任意字符
        console.log(reg.test('\nhello\r world js')); // true
        console.log(reg.test('\n\r ')); // true
        console.log(reg.test('\n\r'), "------------------"); // false

        const reg1 = /\d/; // \d 等同于[0-9] 匹配任意数字
        console.log(reg1.test('12'));
        console.log(reg1.test('0'));
        console.log(reg1.test('1a'));
        console.log(reg1.test('a'), "------------------"); //false

        const reg2 = /\D/; // \D等同于[^0-9] 不匹配数字
        console.log(reg2.test('1')); //false
        console.log(reg2.test('a'));
        console.log(reg2.test('!'));
        console.log(reg2.test(' '), "------------------");

        const reg3 = /\w/; // \w 匹配[0-9A-Za-z_]
        console.log(reg3.test('a'));
        console.log(reg3.test('A'));
        console.log(reg3.test('_'));
        console.log(reg3.test('1'));
        console.log(reg3.test(' '), "------------------"); //false

        const reg4 = /\W/; // \W 匹配[^0-9A-Za-z_]
        console.log(reg4.test('0'));
        console.log(reg4.test('a'));
        console.log(reg4.test('_'));
        console.log(reg4.test(' '), "------------------"); //true

        const reg5 = /\s/; // \s 匹配任何unicode空白符 空格 制表符 换行符 [\f\n\t\r]
        console.log(reg5.test(' '));
        console.log(reg5.test('\n'));
        console.log(reg5.test('\r'));
        console.log(reg5.test('a'), "------------------"); //false

        const reg6 = /\S/; // \S 等效于 [^\f\t\n\r]
        console.log(reg6.test('1'));
        console.log(reg6.test('a'));
        console.log(reg6.test('!'));
        console.log(reg6.test('\n')); //false
    }
}


{
    console.log("数量词...............");
    // 数量词

    /*
      字符	   含义
      *	       >=0次
      +	       ≥1 次
      ?	       0或1次
      {n}	   n 次
      {n,}	   ≥n 次
      {n,m}	   n到m 次
    */

    const reg1 = /^a*$/; // * 允许出现0次或多次
    console.log(reg1.test("")); // true
    console.log(reg1.test("a")); // true
    console.log(reg1.test("aa"), "------------------"); // true

    const reg2 = /^a+$/; // + 允许出现1次或多次
    console.log(reg2.test("")); //false
    console.log(reg2.test("a")); //true
    console.log(reg2.test("aa"), "------------------"); //true

    const reg3 = /^a?$/; // ? 只允许a出现1次或0次
    console.log(reg3.test("")); //true
    console.log(reg3.test("a")); //true
    console.log(reg3.test("aa")); //false
    console.log(reg3.test("aaa"), "------------------"); //false

    const reg4 = /^a{3}$/; // {3} 允许重复3次
    console.log(reg4.test("aaa")); //true
    console.log(reg4.test("aaaa")); //false
    console.log(reg4.test("a"), "------------------"); //false

    const reg5 = /^a{3,5}$/; // {3,5} 允许重复出现3次-5次之间，也就是>=3且<=5
    console.log(reg5.test('aa')); //false
    console.log(reg5.test('aaa'));
    console.log(reg5.test('aaaa'));
    console.log(reg5.test('aaaaa'));
    console.log(reg5.test('aaaaaa'), "------------------"); //false

    const reg6 = /^a{3,}$/;  // {3,} 允许重复出现3次或3次以上多次
    console.log(reg6.test('aa')); //false
    console.log(reg6.test('aaa'));
    console.log(reg6.test('aaaaaa'), "------------------");
}

{
    console.log("贪婪模式和非贪婪模式------------------");
    /* 
      贪婪模式和非贪婪模式
        贪婪模式：尽可能多的匹配（首先取最多可匹配的数量为一组进行匹配）
        当匹配剩余的字符串，还会继续尝试新的匹配，直到匹配不到为止，为默认模式。
        
        非贪婪模式：尽可能少的匹配（每次取最少匹配的数量为一组进行匹配）
        直到匹配不到为止 (使用方法：在量词后加上?)
    */

    //贪婪模式
    const reg = /\d{3,6}/g;
    console.log(reg.exec("12345678")); // 数组 '123456'
    console.log(reg.exec("12345678")); // null

    //非贪婪模式
    const regex = /\d{3,6}?/g;
    console.log(regex.exec("123456789")); // '123', 
    console.log(regex.exec("123456789")); // '456'
    console.log(regex.exec("123456789")); // '789'
    console.log(regex.exec("123456789")); // null
    console.log(regex.exec("123456789")); // '123'
}


{
    // 选择，分组，候选
    {
        console.log("选择-------------------------");
        /*
          选择
            字符"|"用于分隔供选择的字符
            选择项的尝试匹配次序是从左到右，直到发现了匹配项
            如果左边的选择项匹配，就忽略右边的匹配项，即使它可以产生更好的匹配。
        */
        const reg = /html|css|js/g;
        console.log(reg.exec('hello world css html')); // 'css'
        console.log(reg.exec('hello world css html')); // 'html'
    }

    {
        console.log("分组--------------------------");
        // 分组  有圆括号包裹的一个小整体成为分组
        const reg = /BruitBruitBruit/;
        console.log(reg.test('Bruit')); //false
        console.log(reg.test('BruitBruit')); //false
        console.log(reg.test('BruitBruitBruit'));
        console.log(reg.test('BruitBruitBruitBruit'), "-------------------");

        const regex = /^(Bruit){3}$/;
        console.log(regex.test('Bruit')); //false 
        console.log(regex.test('BruitBruit')); //false
        console.log(regex.test('BruitBruitBruit')); //true
        console.log(regex.test('BruitBruitBruitBruit')); //false
    }


    // 候选  选择分组综合
    {
        console.log("候选-----------------");
        const reg = /I like (html|css|js)/;
        console.log(reg.test('I like html'));
        console.log(reg.test('I like css'));
        console.log(reg.test('I like js'));
        console.log(reg.test('I like table')); //false
    }
}


{
    console.log("捕获和引用--------------------------");
    // 捕获和引用
    {
        // 被正则表达式匹配（捕获）到的字符串会被暂存起来。其中，由分组捕获的串会从1开始编号，于是我们可以引用这些串

        const reg = /(\d{4})-(\d{2})-(\d{2})/;
        const result = reg.exec('2023-06-28');
        if (result !== null) {
            const [, year, month, day] = result; // 解构赋值获取捕获组的值
            console.log(year, month, day);
        }
        // 废弃....
        console.log(RegExp.$1); // 2023
        console.log(RegExp.$2); // 06
        console.log(RegExp.$3, "-----------------------"); // 28
    }

    {
        // 嵌套分组的捕获 : 规则是以左括号出现的顺序进行捕获
        const reg = /((apple) is (a (fruit)))/;
        reg.exec('apple is a fruit');
        console.log(RegExp.$1); //apple is a fruit
        console.log(RegExp.$2); //apple 
        console.log(RegExp.$3); //a fruit
        console.log(RegExp.$4, "--------------------"); //fruit
    }

    {
        // 引用： 正则表达式里也能进行引用，这称为反向引用
        const reg = /(\w{3}) is \1/
        console.log(reg.test('kid is kid')); // true
        console.log(reg.test('dik is dik')); // true
        console.log(reg.test('kid is dik')); // false
        console.log(reg.test('dik is kid'), "---------------------"); // false
        // \1引用了第一个被分组所捕获的串，换言之，表达式是动态决定的。

        // 注意，如果编号越界了，则会被当成普通的表达式：
        const regex = /(\w{3}) is \6/;
        console.log(regex.test('kid is kid')); // false
        console.log(regex.test( 'kid is \6'));  // true
    }
}


{
    // String对正则表达式的支持
    {
        console.log("search---------------");
        /* 
          search
            查找字符串中是否有匹配正则的字符串
            有则返回字符串第一次出现时的位置，无则返回null
            正则中无论是否有全局匹配都不会影响返回结果
        */
        const reg1 = /hello/;
        const reg2 = /hello/g;
        console.log('hello world hello'.search(reg1));  // 0
        console.log('hello world hello'.search(reg2)); // 0
    }

    {
        console.log("match-------------------");
        /* 
          match
            字符串匹配符合正则表达式字符串 匹配到返回数组
            并返回该字符串的一个数组，其中包括字符串内容、位置
            
            如果正则设置全局匹配，则一次性返回所有符合正则表达式的字符串数组
            如果其中添加了分组，返回符合要求的字符串以及分组的一个数组
            但如果同时开启全局匹配则不会在数组中添加分组内容
        */
        const str = 'hello world hello';
        const reg1 = /hello/;
        const reg2 = /hello/g;
        const reg3 = /(he)llo/;
        const reg4 = /(he)llo/g;

        console.log(str.match(reg1));
        console.log(str.match(reg2));
        console.log(str.match(reg3));
        console.log(str.match(reg4));
    }

    {
        console.log("split-------------------");
        // split  以某种形式分割字符串 将其转换为数组
        const str = 'terry123larry456tony';
        const reg = /\d{3}/;
        console.log(str.split(reg)); //[ 'terry', 'larry', 'tony' ]
    }

    {
        console.log("replace----------------------");
        // replace  满足正则表达式的内容会被替换
        const str = 'javascript';
        const reg = /javascript/;
        const res = str.replace(reg, 'java');
        console.log(res, str, reg); //java javascript /javascript/

    }
}


{
    /* 
      前瞻表达式
    
      表达式	 名称	        描述
      (?=exp)	正向前瞻	匹配后面满足表达式exp的位置
      (?!exp)	负向前瞻	匹配后面不满足表达式exp的位置
    */
    const str = 'He, Hi, I am Hi.';
    // 一定要匹配什么
    const reg1 = /H(?=i)/g;
    console.log(str.replace(reg1, "T")); //He, Ti, I am Ti.

    // 一定不要匹配什么
    const reg2 = /H(?!i)/g;
    console.log(str.replace(reg2, "T")); //Te, Hi, I am Hi.
}

{
    // 例如：
    // 匹配密码，必须包含大写，小写和数字, 和特殊字符(!, @,#,%,&), 且大于6位 
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#%&])^[A-Za-z\d!@#%&]{6,}$/g;

    // 以1为开头 第二位为3，4，5，7，8中的任意一位 最后以0 - 9的9个整数结尾
    /^1[34578]\d{9}$/g
}