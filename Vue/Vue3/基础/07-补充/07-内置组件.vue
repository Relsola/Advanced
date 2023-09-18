<template>
    <!-- 
        在一个元素或组件进入和离开 DOM 时应用动画 
          由 v-if 所触发的切换
          由 v-show 所触发的切换
          由特殊元素 <component> 切换的动态组件
          改变特殊的 key 属性 
    -->
    <Transition>
        <p v-if="show">hello</p>
    </Transition>


    <!-- 
        在一个 v-for 列表中的元素或组件被插入，移动，或移除时应用动画
          默认情况下，它不会渲染一个容器元素。但你可以通过传入 tag prop 来指定一个元素作为容器元素来渲染。
          过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换。
          列表中的每个元素都必须有一个独一无二的 key attribute。
          CSS 过渡 class 会被应用在列表内的元素上，而不是容器元素上
    -->
    <TransitionGroup>
        <li v-for="item in items" :key="item">
            {{ item }}
        </li>
    </TransitionGroup>


    <!-- 
        非活跃的组件将会被缓存！
        include 根据组件的 name 选项进行匹配控制包含和排除  接收参数为字符串、正则表达式，数组
        max 来限制可被缓存的最大组件实例数  即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间
     -->
    <KeepAlive include="a,b" :max="10">
        <component :is="activeComponent" />
    </KeepAlive>



    <!-- 
        <Teleport> 接收一个 to prop 来指定传送的目标。
        to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。
        <Teleport> 动态地传入一个 disabled 实现动态禁用
     -->
    <Teleport to="body" :disabled="isMobile">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>



    <!-- 
        异步依赖 
          -- 实验性功能
          它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态
    -->
    <Suspense>
        <!-- 主要内容 -->
        <component :is="Component"></component>

        <!-- 加载中状态 -->
        <template #fallback>
            正在加载...
        </template>
    </Suspense>
</template>

<script setup>
// 如果使用 <script setup>，那么顶层 await 表达式会自动让该组件成为一个异步依赖
const res = await fetch('...');
const posts = await res.json();
</script>


<!-- 组合式 API 中组件的 setup() 钩子可以是异步的 -->
<script>
export default {
    async setup() {
        const res = await fetch("...")
        const posts = await res.json()
        return {
            posts
        }
    }
}
</script>
