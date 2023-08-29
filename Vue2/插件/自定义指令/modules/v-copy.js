// 实现一键复制文本内容，用于鼠标右键粘贴。

const copy = {
    bind(el, { value }) {
        el.$value = value
        el.handler = async () => {
            if (!el.$value) {
                console.log('无复制内容')
                return
            }

            try {
                await navigator.clipboard.writeText(el.$value);
                console.log("复制成功");
            } catch (error) {
                console.error('复制失败:', error);
            }
        }
        // 绑定点击事件，就是所谓的一键 copy 啦
        el.addEventListener('click', el.handler)
    },

    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
        el.$value = value
    },

    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
        el.removeEventListener('click', el.handler)
    },
}

export default copy