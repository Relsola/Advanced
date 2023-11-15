<template>
  <!-- 
      :value="string" @update:value="string = $event"
      简写 :value.sync="string"

      v-bind.sync="post" => 把 post 对象中的每一个 property (如 id) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

      .native 直接监听子组件根实例上的事件
  -->
  <Demo @my-event="msg += 'HE'" v-model="msg" :value.sync="string" @click.native="onClick" @add="add" />
</template>

<script>
import Demo from "./components/Demo.vue";

export default {
  data: () => ({
    msg: "Hello Vue",
    string: "wonder"
  }),

  methods: {
    // 子集触发自定义事件传递参数的时候 会传递到父级的事件监听器上
    onClick() {
      console.log("Prop被点击了");
    },

    add(val) {
      console.log(val);
    }
  },

  components: { Demo },
};
</script>
