{
    /*
   unknown与any一样，所有类型都可以分配给unknown

   unknown与any的最大区别是： 
   任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。
   unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any
*/

    let notSure: unknown = 4;
    notSure = "maybe a string instead"; // OK
    notSure = false; // OK

    let ms: unknown = 4
    let msg: any = ms
    let mss: unknown = ms
    // let num:number = ms // Error
}


{
    /* 
       如果不缩小类型，就无法对unknown类型执行任何操作

        这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用typeof、类型断言等方式来缩小未知范围
    */

    const getDog = (): string => "dog";
    const dog: unknown = { hello: getDog };
    // dog.hello() // Error


    const getCat = () => {
        let x: unknown;
        return x;
    }

    const cat = getCat();
    // 直接使用
    // const upName = cat.toLowerCase(); // Error

    // typeof
    if (typeof cat === "string") { const upName = cat.toLowerCase(); }

    // 类型断言 
    const upName = (cat as string).toLowerCase(); // OK
}