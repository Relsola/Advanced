import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.jsx';

let nextId = 3;
export default () => {
    const [text, setText] = useState('');
    const dispatch = useTasksDispatch();

    return (
        <>
            <input
                placeholder='添加任务'
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button
                onClick={() => {
                    setText('');
                    dispatch({
                        type: 'added',
                        id: nextId++,
                        text: text
                    })
                }}
            >
                添加
            </button>
        </>
    )
};