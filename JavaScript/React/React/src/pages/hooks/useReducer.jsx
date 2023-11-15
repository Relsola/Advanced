import { useReducer } from "react";
import { useState } from 'react';

const initialState = { count: 0 };
const stateReducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return initialState;
        case "add":
            return { ...state, count: action.value };
        case "reduce":
            return { ...state, count: action.value };
        default:
            throw new Error("Unknown action");
    }
}

export default () => {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const addOne = () => {
        dispatch({ type: 'add', value: state.count + 1 })
    }
    const reduceOne = () => {
        dispatch({ type: 'reduce', value: state.count - 1 })
    }
    const reset = () => { dispatch({ type: 'reset' }) }

    return (
        <div>
            <h1>欢迎来到我的计数器</h1>

            <p>计数： {state.count}</p>
            <button onClick={addOne}>加 1</button>
            <button onClick={reduceOne}>加 2</button>
            <button onClick={reset}>重置</button>
        </div>
    )
};


// 使用 Immer 简化 reducers
{
    const initialState = { count: 0 };
    const stateReducer = (draft, action) => {
        switch (action.type) {
            case "reset":
                return initialState;
            case "add":
                draft.count++
                break
            case "reduce":
                draft.count--
                break
            default:
                throw new Error("Unknown action");
        }
    }

}

{
    // 实现 useReducer Hook
    function useReducer(reducer, initialState) {
        const [state, setState] = useState(initialState);
        function dispatch(action) {
            setState(s => reducer(s, action))
        }
        return [state, dispatch];
    }
}
