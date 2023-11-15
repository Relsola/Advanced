<template>
  <div>
    <h2>{{ msg }}</h2>

    <!-- v-text不会识别html标签 -->
    <p v-text="msg"></p>
    <!-- v-html会识别html标签 -->
    <p v-html="div"></p>

    <!-- 
      幽灵标签 用于包裹 不会渲染到页面上
    划分块 提高我们代码的整洁度
    -->
    <template>
      <!-- v-on => @ -->
      <button @click="toggle">切换num</button>
      <p v-if="num === 1">num === 1</p>
      <p v-else-if="num === 0">num === 0</p>
    </template>

    <!-- v-if 正真的条件渲染  v-show 渲染然后控制display属性显示隐藏 -->
    <template>
      <button @click="toggle">切换show</button>
      <p v-show="num === 1">num === 1</p>
    </template>

    <!-- 用于控制是否渲染一堆标签 -->
    <template v-if="false">
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </template>

    <!-- v-bind 单向绑定 简写 :src=url -->
    <img v-bind:src="url" alt="" />
    <!-- 动态绑定属性名 -->
    <p :[title]="time">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    div: "<div>Hello Vue</div>",
    num: 1,
    show: true,
    url: "https://psc2.cf2.poecdn.net/0c669b78eb3188686ead5156feec2a10e4eaf1c1/_next/static/media/chatGPTAvatar.04ed8443.png",

    title: "title",
    time: "页面加载于" + new Date().toLocaleString(),
  }),

  methods: {
    toggle() {
      this.num ^= 1;
    },
  },
};
</script>
