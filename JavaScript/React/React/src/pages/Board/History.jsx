export default ({ history, handlePlay }) => (
    <>
        {history.map((_, index) => (
            <button
                className="history"
                key={`h${index}`}
                onClick={() => { handlePlay(index) }}
            >
                GO to game {index === 0 ? 'start' : `#${index}`}
            </button>
        ))}
    </>
);