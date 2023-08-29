// 实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件

const longpress = {
    bind: function (el, { value, arg: time }) {
        if (typeof value !== 'function')
            throw new Error('callback must be a function');

        // 创建计时器
        let pressTimer = null
        const start = (e) => {
            if (e.type === 'click' && e.button !== 0) return;

            if (pressTimer === null)
                pressTimer = setTimeout(() => { value(e) }, Number(time))
        }

        // 取消计时器
        const cancel = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }

        // 添加事件监听器
        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start);
        el.addEventListener('click', cancel);
        el.addEventListener('mouseout', cancel);
        el.addEventListener('touchend', cancel);
        el.addEventListener('touchcancel', cancel);
    },

    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
        el.$value = value
    },

    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
        el.removeEventListener('mousedown', el.start);
        el.removeEventListener('touchstart', el.start);
        el.removeEventListener('click', el.cancel);
        el.removeEventListener('mouseout', el.cancel);
        el.removeEventListener('touchend', el.cancel);
        el.removeEventListener('touchcancel', el.cancel);
    },
}

export default longpress