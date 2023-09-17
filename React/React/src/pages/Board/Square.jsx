export default ({ squares, handleClick, winner }) => (
    <>
        <h2>{winner}</h2>
        <div className='board'>
            {Array(9).fill(null).map((_, index) => <button
                className='square'
                onClick={() => { handleClick(index) }}
                key={`s${index}`}
            >
                {squares[index]}
            </button>
            )}
        </div>
    </>
);