<template>
  <div>
    <h2>{{ msg }}</h2>

    <!-- 
        事件名不存在任何自动化的大小写转换
        而是触发的事件名需要完全匹配监听这个事件所用的名称
        推荐使用 kebab-case 事件名
    -->
    <button @click="$emit('myEvent')">myEvent</button>
    <button @click="$emit('my-event')">my-event</button>

    <!-- v-model 语法糖 -->
    <h1>{{ checked }}</h1>
    <input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)">

    <!-- 更新父组件数据 推荐写法 -->
    <input :value="$attrs.value">
    <button @click="$emit('update:value', $attrs.value + 'OF')">+= OF</button>

    <button @click="$emit('add', 1, 2, 3)">触发add</button>
  </div>
</template>

<script>
export default {

  // 因为 v-model 有多个语法糖 推荐这种写法 注意依然要在props中接收这个变量名
  // 第二种写法 直接接收value变量名(固定)+input事件名(固定)
  model: {
    // 接受的变量名
    prop: "checked",
    // 触发的事件名
    event: "change"
  },
  props: ["msg", "checked"],

  created() {
    console.log(
      this.$listeners,
      this.$attrs
    );
  }

};
</script>

