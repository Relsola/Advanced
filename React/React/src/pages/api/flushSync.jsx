// flushSync 可以强制 React 同步更新（“刷新”）DOM
import { useState, useRef } from "react";
import { flushSync } from "react-dom";

let nextId = 1;
let initialTodos = [];
for (let i = 0; i < 5; i++) {
    initialTodos.push({
        id: nextId++,
        text: '待办 #' + (i + 1)
    });
};

const style = {
    width: '200px',
    height: '200px',
    overflow: 'auto',
    border: '1px solid #ccc',
}

// 不强制刷新
function TodoList() {
    const listRef = useRef(null);
    const [text, setText] = useState('');
    const [todos, setTodos] = useState(initialTodos);

    function handleAdd() {
        const newTodo = { id: nextId++, text: text };
        setText('');
        setTodos([...todos, newTodo]);
        // 滚动元素到可视区域
        listRef.current.lastChild.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    return (
        <div style={style} >
            <h3>没有同步更新DOM</h3>
            <button onClick={handleAdd}> 添加 </button>
            <input
                value={text}
                onChange={e => { setText(e.target.value) }}
            />
            <ul ref={listRef}>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    )
};

// flushSync调用 强制刷新
function TodoListFlush() {
    const liRef = useRef(null);
    const [text, setText] = useState('');
    const [todos, setTodos] = useState(initialTodos);

    function handleAdd() {
        const newTodo = { id: nextId++, text: text };

        // 将 state 更新包裹 到 flushSync 调用中
        flushSync(() => {
            setText('');
            setTodos([...todos, newTodo]);
        })

        // 第二种写法
        liRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    return (
        <div style={style} >
            <h3>没有同步更新DOM</h3>
            <button onClick={handleAdd}> 添加 </button>
            <input
                value={text}
                onChange={e => { setText(e.target.value) }}
            />
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        // 控制 ref 获得的DOM元素
                        ref={todo.id === nextId - 1 ? liRef : null}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    )
};


export default () => (
    <>
        <TodoList />
        <br />
        <TodoListFlush />
    </>
);
