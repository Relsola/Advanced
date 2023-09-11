<template>
  <div>
    <!-- 
      使用 is  来切换不同的组件
      <component v-bind:is="currentTabComponent"></component>
      这种方法每次切换组件的时候，Vue 都创建了一个新的组件实例。

      使用 <keep-alive> 元素将其动态组件包裹起来
      能够在组件第一次被创建的时候缓存下来
     -->
    <Demo />

    <keep-alive>
      <component :is="once" />
    </keep-alive>

    <button @click="handle">切换组件</button>
  </div>
</template>

<script>
const Demo = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import("@/components/Demo.vue"),
  // 异步组件加载时使用的组件
  // loading: LoadingComponent,
  // 加载失败时使用的组件
  // error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000,
});
import One from "@/components/One.vue";
import Two from "@/components/Two.vue";

export default {
  data: () => ({
    once: "One",
  }),

  methods: {
    handle() {
      this.once = this.once === "One" ? "Two" : "One";
    },
  },

  components: {
    Demo,
    One,
    Two,
  },
};
</script>