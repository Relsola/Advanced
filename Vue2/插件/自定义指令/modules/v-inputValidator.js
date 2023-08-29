// 根据正则表达式，设计自定义处理表单输入规则的指令，默认只能输入数字和字母

const inputValidator = {
    bind: (el, { value }) => {
        const regRule = value instanceof RegExp ? value : /[^a-zA-Z\d]/g
        const $inp = el.tagName.toLowerCase() === "input" ? el : el.querySelector("input");

        $inp.handle = () => {
            $inp.value = $inp.value.replace(regRule, '')
            // 将事件触发的操作延迟到下一帧中执行，避免了堆栈溢出
            requestAnimationFrame(() => {
                const event = new Event('input', { bubbles: true, cancelable: true })
                $inp.dispatchEvent(event)
            })
        }
        $inp.addEventListener('input', $inp.handle)
        el.$inp = $inp
    },
    unbind: function (el) {
        el.$inp.removeEventListener('input', el.$inp.handle)
    },
}

export default inputValidator

