<template>
  <div>
    <!-- 
      当组件渲染的时候，<slot></slot> 将会被替换
      插槽内可以包含任何模板代码，包括 HTML
      甚至其它的组件
    -->
    <!-- 
      <slot>
        <h2>默认内容</h2>
      --捕获所有未被匹配的内容--
      </slot> 
    -->

    <!-- 
      在向具名插槽提供内容的时候，
      我们可以在一个 <template> 元素上使用 v-slot 指令
      并以 v-slot 的参数的形式提供其名称
    -->
    <slot name="once">
      <h2>具名插槽 once</h2>
    </slot>

    <slot name="two">
      <h2>具名插槽 two</h2>
    </slot>

    <!-- v-bind:user="user" -->
    <slot :user="user">
      {{ user.lastName }}
    </slot>

    <slot :user="user" name="user">
      {{ user.firstName }}
    </slot>
  </div>
</template>

<script>
export default {

  data: function () {
    return {
      user: {
        firstName: "firstName",
        lastName: "lastName "
      }
    }
  },

};
</script>