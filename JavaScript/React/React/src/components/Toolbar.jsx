const Button = ({ onClick, children }) => (
    <button
        onClick={e => {
            // 阻止事件冒泡
            e.stopPropagation();
            onClick();
        }}
    >
        {children}
    </button>
);

const Form = ({ onClick, children }) => (
    <form
        onSubmit={e => {
            // 阻止默认事件
            e.preventDefault();
            onClick();
        }}
    >
        <input />
        <button >{children}</button>
    </form>
)


export default () => (
    <div
        style={{


            
            padding: '10px',
            backgroundColor: '#ccc',
        }}
        // onClick={() => { alert('你点击了 toolbar !') }}
        // 第二种方式
        onClick={e => {
            if (e.target.tagName === 'DIV')
                alert('你点击了 toolbar !');
        }}
    >
        <Button onClick={() => alert('正在播放魔女宅急便！')}>
            '魔女宅急便'
        </Button>
        <Form onClick={() => { alert('发送成功！') }}>
            发送
        </Form>
    </div>
);