import { useRef, useState, forwardRef, useImperativeHandle } from "react";

// useRef 不会触发更新
function UseRef() {
    // 组件会记住ref里的信息，但更改这些信息不会触发新的渲染
    const ref = useRef(0);
    console.log(ref); // 返回一个ref对象，可读可修改

    const handleClick = () => { ref.current++ }

    const [focus, setFocus] = useState(true)
    return (
        <>
            <h1>ref: {ref.current}</h1>
            <button onClick={handleClick}>点我 +1</button>
            <button onClick={() => { setFocus(!focus) }}>刷新 ref</button>
        </>
    )
};

// 秒表
function Stopwatch() {
    const [startTime, setStartTime] = useState(0);
    const [now, setNow] = useState(0);
    const intervalRef = useRef(null)


    const handleStart = () => {
        setStartTime(Date.now());
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
    }

    const handleStop = () => { clearInterval(intervalRef.current) }

    return (
        <>
            <h1>{((now - startTime) / 1000).toFixed(3)}</h1>
            <button onClick={handleStart}>开始</button>
            <button onClick={handleStop}>暂停</button>
        </>
    )
};

// 获取单个DOM
function Form() {
    const inputRef = useRef(null);
    return (
        <>
            <input ref={inputRef} />
            <button onClick={() => { inputRef.current.focus() }}>聚焦输入框</button>
        </>
    )
};

// 获取多个DOM
function Hs() {
    const itemsRef = useRef(new Map());

    const handle = index => { console.log(itemsRef.current.get(index)) }

    return (
        <div>
            {Array(5).fill(null).map((_, index) => {
                const Tag = `h${index + 1}`

                return <Tag
                    key={index}
                    ref={node => {
                        node !== null ?
                            itemsRef.current.set(index, node)
                            : itemsRef.current.delete(index);
                    }}
                    onClick={() => { handle(index) }}
                >
                    {`这是h${index + 1}标签`}
                </Tag>
            })}
        </div>
    )
};

// 获取组件DOM  组件必须 forwardRef 选择暴露其 DOM 节点
const MyInput = forwardRef((props, ref) => {

    const realInputRef = useRef(null);

    // 可以用 useImperativeHandle 限制暴露的功能
    // 不建议手动修改 ref 
    useImperativeHandle(ref, () => ({
        focus() { realInputRef.current.focus() }
    }));

    // return <input {...props} ref={ref} />;
    return <input {...props} ref={realInputRef} />;
});

function MyForm() {
    const inputRef = useRef(null);

    return (
        <>
            {/* ref转发获取组件节点DOM */}
            <MyInput ref={inputRef} />
            <button
                onClick={() => { console.log(inputRef.current) }}
            >
                点我一下
            </button>
        </>
    )
};

// ref操作DOM '../api/flushSync.jsx'

export default MyForm


/* 
  使用 ref 的情况
    - 存储 timeout ID
    - 存储和操作 DOM 元素
    - 存储不需要被用来计算 JSX 的其他对象

  将 ref 视为应急方案
    - 管理焦点
    - 滚动位置
    - 调用 React 未暴露的浏览器 API

  不要在渲染过程中读取或写入 ref.current

  Refs 是一个通用概念，但大多数情况下使用它们来保存 DOM 元素
  通过传递 <div ref={myRef}> 指示 React 将 DOM 节点放入 myRef.current
  默认情况下，组件不暴露其 DOM 节点 可以通过使用 forwardRef 并将第二个 ref 参数传递给特定节点来暴露 DOM 节点
  避免更改由 React 管理的 DOM 节点
  如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分
*/