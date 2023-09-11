const fn = str => {
    const once = new Object();
    for (let i = 0; i < 2; i++) {
        const end = str.indexOf("\n");
        const code = str.slice(0, end)
        str = str.replace(code + "\n", "")
        const result =
            code.match(/^[\s]*(let|var|const)[\s]+([^\s]+)[\s]+=[\s]+([-+\d\w'""]+);?$/)
        once[result[2]] = Number(result[3])
    }
    const result = str.
        match(/^[\s]*console\.log\(([^\s]+)+[\s]*([+-/*%])[\s]*([\d\D]+)\);?[\s]*$/)
    switch (result[2]) {
        case "+":
            console.log(once[result[1]] + once[result[3]]);
            break;
        case "-":
            console.log(once[result[1]] - once[result[3]]);
            break;
        case "*":
            console.log(once[result[1]] * once[result[3]]);
            break;
        case "/":
            console.log(once[result[1]] / once[result[3]]);
            break;
    }
}
fn('let  a    =    2;\nlet   b   =   2;\n     console.log(a * b)      ');
fn('var   dyx  =   7;\nvar    mtf =  2;\n   console.log(dyx + mtf);   ');
fn('const 邓玉祥 = 5;\nconst 马腾飞 = 2;\nconsole.log(邓玉祥 / 马腾飞);');
fn(`let a = 1;
              let b = -1;
         console.log(a-b);`)