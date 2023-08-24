/* 
  类型别名用来给一个类型起个新名字。类型别名常用于联合类型。
*/
{
    type Message = string | string[]
    const greet = (message: Message) => { } 
}


