import { useState } from 'react';

import Board from './pages/Board/Board.jsx';
import Search from './pages/Search/Search.jsx';
import TaskApp from './pages/Task/TaskApp.jsx';
import Hooks from './pages/hooks/index.jsx';
import Api from './pages/api/index.jsx';

import Today from './components/Today';
import MyButton from './components/MyButton';
import List from './components/List';
import Toolbar from './components/Toolbar.jsx';
import logo from './logo.svg';

import './App.css';

const App = () => {
    const [count, setCount] = useState(0);
    const addCount = () => { setCount(count + 1) };

    return (<>
        <div className="App">
            <header className="App-header">
                {/* 复用组件 传递信息 */}
                <MyButton count={count} addCount={addCount} />
                <List />
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noOpener noReferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    </>)
};


export default () => <Hooks />