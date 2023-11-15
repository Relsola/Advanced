import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';
import { TasksProvider } from './TasksContext.jsx';


export default () => (
    <TasksProvider>
        <h1>在京都休息一天</h1>
        <AddTask />
        <TaskList />
    </TasksProvider>
);