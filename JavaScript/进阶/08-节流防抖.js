{
    // 防抖(debounce): 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

    // 非立即执行版
    function debounce(func, delay) {
        let timer = null;
        return function () {
            let context = this;
            if (timer !== null) clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, arguments)
            }, delay)
        }
    }

    // 立即执行版
    function debounce(func, delay) {
        let timer = null;
        return function () {
            let context = this;
            if (timer !== null) clearTimeout(timer);

            const callNow = timer === null;
            timer = setTimeout(() => { timer = null }, delay)

            if (callNow) func.apply(context, arguments);
        }
    }

    // 双剑合璧版
    /**
     * @desc 函数防抖
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param immediate true 表立即执行，false 表非立即执行
     */
    function debounce(func, wait, immediate) {
        let timer = null;
        return immediate ?
            function () {
                const context = this;
                if (timer !== null) clearTimeout(timer)
                const callNow = timer === null
                setTimeout(() => { timer = null }, wait)
                if (callNow) func.apply(context, arguments)
            }
            : function () {
                let context = this;
                if (timer !== null) clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(context, arguments)
                }, wait)
            }
    }
}


{
    // 
}