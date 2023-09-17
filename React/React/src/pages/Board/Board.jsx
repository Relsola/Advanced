import { useState } from "react";
import Square from "./Square";
import History from "./History";

const calculateWinner = squares => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] !== null && squares[a] === squares[b] && squares[b] === squares[c])
            return squares[a];
    }
    return null
}

export default () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(1);

    const xIsNext = currentMove & 1 === 1;
    const winner = calculateWinner(squares);

    const handleClick = i => {
        if (squares[i] || winner) return;

        setCurrentMove(currentMove + 1)
        // React 必须数据变化才能检测更新，意味着引用数据类型需要浅克隆
        const nextSquares = [...squares]
        nextSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(nextSquares);
        setHistory(history.slice(0, currentMove).concat([nextSquares]))
    }

    const handlePlay = i => {
        setSquares(history[i]);
        setCurrentMove(i + 1)
    }

    return (
        <>
            <Square
                squares={squares}
                handleClick={handleClick}
                winner={winner}
            />
            <History
                history={history}
                handlePlay={handlePlay}
            />
        </>
    )
};