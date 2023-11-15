<template>
  <div>
    <!-- 
      父级模板里的所有内容都是在父级作用域中编译的
      子模板里的所有内容都是在子作用域中编译的
    -->
    <Demo>
      <!-- 
      一个不带 name 的 <slot> 出口会带有隐含的名字 default
      <template v-slot:default>
        <h2>使用了默认插槽</h2>
      </template> 
    -->

      <template v-slot:once>
        <h2>使用了 once 插槽</h2>
      </template>

      <!--
      具名插槽的缩写 v-slot: => # 
      该缩写只在其有参数的时候才可用
      #="{ user }"  会触发一个警告
    -->
      <template #two>
        <h2>使用了 two 插槽</h2>
      </template>

      <template v-slot:default="scope">
        {{ scope.user.firstName }}
      </template>

      <!-- 解构插槽 Prop (可以重命名) -->
      <template v-slot:user="{ user: a }">
        <!-- {{ user.lastName }} -->
        {{ a.lastName }}
      </template>

      <!-- 
      动态插槽名
      <template v-slot:[dynamicSlotName]>
        ...
      </template>
    -->

    </Demo>

    <!-- 
      只有默认插槽时可以简写
      <Demo v-slot="slotProps">{{ slotProps.user.firstName }}</Demo>
      注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确
      只要出现多个插槽，请始终为所有的插槽使用完整的基于 <template> 的语法
    -->

    <!-- 废弃的写法-------------------------------- -->
    <Demo>
      <template slot="once">
        <h1>使用了 once 插槽</h1>
      </template>

      <!-- 
        <template slot="default" slot-scope="slotProps">
        这里的 slot="default" 可以被忽略
      -->
      <template slot-scope="slotProps">
        {{ slotProps.user.firstName }}
      </template>

      <template slot="user" slot-scope="{user:a}">
        {{ a.lastName }}
      </template>
    </Demo>
  </div>
</template>

<script>
import Demo from '@/components/Demo.vue';
export default { components: { Demo } }
</script>