<template>
  <div>
    <p>{{ msg }}</p>
    <input type="text" v-model="text" @input="getThis" />
    <input type="password" v-model="password" @input="getThis" />

    <!-- 
        事件修饰符 可以连用 @click.stop.prevent.once
        prevent 取消默认事件
        取消事件冒泡
        once修饰符 只执行一次
     -->
    <a href="http://localhost:8080/" @click.stop.prevent.once="text = '112'">我跳我自己</a>


    <!-- 阻止单击事件继续传播 -->
    <a @click.stop="doThis"></a>

    <!-- 可以只有修饰符，提交事件不再重载页面 -->
    <form @submit.prevent="onSubmit"></form>

    <!-- 修饰符链式调用-->
    <a @click.stop.prevent="doThat"></a>

    <!-- 只有修饰符 -->
    <form @submit.prevent></form>

    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>

    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>

    <!-- .capture、.once 和 .passive 修饰符与原生 addEventListener 事件相对应 -->
    <!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
    <!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
    <div @click.capture="doThis">...</div>

    <!-- 点击事件最多被触发一次 -->
    <a @click.once="doThis"></a>

    <!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
    <!-- 以防其中包含 `event.preventDefault()` -->
    <div @scroll.passive="onScroll">...</div>


    <!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
    <input @keyup.enter="submit" />

    <!-- Alt + Enter -->
    <input @keyup.alt.enter="clear" />

    <!-- Ctrl + 点击 -->
    <div @click.ctrl="doSomething">Do something</div>

    <!-- .exact 修饰符允许控制触发一个事件所需的确定组合的系统按键修饰符 -->
    <!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
    <button @click.ctrl="onClick">A</button>

    <!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
    <button @click.ctrl.exact="onCtrlClick">A</button>

    <!-- 仅当没有按下任何系统按键时触发 -->
    <button @click.exact="onClick">A</button>

  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    text: null,
    password: null,
  }),

  methods: {
    getThis() {
      this.getInfo(this);
    },

    getInfo: (vue) => {
      console.log(vue.text);
      console.log(vue.password);
    },
  },
};
</script>
