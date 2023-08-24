/* 
  联合类型表示取值可以为多种类型中的一种，使用 | 分隔每个类型。
  联合类型通常与 null 或 undefined 一起使用
*/

{
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven'; // OK
    myFavoriteNumber = 7; // OK

    let num: 0 | 1 = 1;
    type EventNames = 'click' | 'scroll' | 'mousemove';
}