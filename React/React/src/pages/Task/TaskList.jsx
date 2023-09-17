import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.jsx';

const Task = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useTasksDispatch();
    const taskContent = (
        <>
            <input
                style={{ display: isEditing ? 'inline-block' : 'none' }}
                value={task.text}
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        task: {
                            ...task,
                            text: e.target.value
                        }
                    })
                }}
            />
            {!isEditing && task.text}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? '保存' : '编辑'}
            </button>
        </>
    )

    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        task: {
                            ...task,
                            done: e.target.checked
                        }
                    })
                }}
            />
            {taskContent}
            <button
                onClick={() => {
                    dispatch({
                        type: 'deleted',
                        id: task.id
                    })
                }}
            >
                删除
            </button>
        </label>
    )
}

export default () => {
    const tasks = useTasks();
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    )
};