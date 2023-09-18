import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    watchEffect(() => {
        // 在 fetch 之前重置状态
        data.value = null
        error.value = null
        // toValue() 将可能的 ref 或 getter 解包
        fetch(toValue(url))
            .then((res) => res.json())
            .then((json) => (data.value = json))
            .catch((err) => (error.value = err))
    })

    return { data, error }
}