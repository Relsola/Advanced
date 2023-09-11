<!-- 单元测试 -->
<script setup>
// helpers.js
export function increment(current, max = 10) {
    if (current < max) {
        return current + 1
    }
    return current
}

// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
    test('increments the current number by 1', () => {
        expect(increment(0, 10)).toBe(1)
    })

    test('does not increment the current number over the max', () => {
        expect(increment(10, 10)).toBe(10)
    })

    test('has a default max of 10', () => {
        expect(increment(10)).toBe(10)
    })
})
</script>


<script setup>
// npm install -D vitest happy-dom @testing-library/vue

// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // 启用类似 jest 的全局测试 API
    globals: true,
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: 'happy-dom'
  }
})


// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // 断言输出
  getByText('...')
})

// package.json
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
</script>


<!-- 测试组合式函数 -->
<script setup>
// counter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}


// counter.test.js
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})


// 一个依赖生命周期钩子或供给/注入的组合式函数需要被包装在一个宿主组件中才可以测试
// 我们可以创建下面这样的帮手函数
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // 忽略模板警告
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // 返回结果与应用实例
  // 用来测试供给和组件卸载
  return [result, app]
}

import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // 为注入的测试模拟一方供给
  app.provide(...)
  // 执行断言
  expect(result.foo.value).toBe(1)
  // 如果需要的话可以这样触发
  app.unmount()
})
</script>