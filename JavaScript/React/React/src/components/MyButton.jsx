import { useState } from "react";

const active = 'active';
const msg = "I'm a button";
const butStyle = {
    outline: 'none',
    border: 'none',
    color: 'white',
    padding: '20px'
};

export default ({ count, addCount }) => {
    // Hook 只能在你的组件（或其他 Hook）的 顶层 调用 
    // 如果你想在一个条件或循环中使用 useState，提取一个新的组件并在组件内部使用它
    const [show, setShow] = useState(true);
    const handle = _ => {
        setShow(!show);
        addCount();
    };

    return <>
        {/* class 类名用 className 属性 */}
        <h1 className={active}>{show ? 'About' : count}</h1>
        {/* 
    使用大括号 将 JSX 属性 “转义到 JavaScript”
    支持JS表达式，条件渲染
    */}
        <button
            style={{ backgroundColor: 'blueviolet', ...butStyle }}
            onClick={handle}
        >{msg}</button>
    </>
}
