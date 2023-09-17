import { createContext, useContext, useReducer } from 'react';

const TaskContext = createContext(null);
const TasksDispatchContext = createContext(null);

const initialTasks = [
    { id: 0, text: '哲学家之路', done: true },
    { id: 1, text: '参观寺庙', done: false },
    { id: 2, text: '喝抹茶', done: false }
];

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
        };
        case 'changed': {
            return tasks.map(item =>
                item.id === action.task.id ? action.task : item
            )
        };
        case 'deleted': {
            return tasks.filter(item => item.id !== action.id)
        };
        default:
            throw new Error(`未知操作： ${action.type}`)
    }
};

export const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TaskContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TaskContext.Provider>
    )
};

export const useTasks = () => useContext(TaskContext);
export const useTasksDispatch = () => useContext(TasksDispatchContext);