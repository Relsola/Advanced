<template>
  <div>
    <!-- 
      单元素/组件的过渡
        条件渲染 (使用 v-if)
        条件展示 (使用 v-show)
        动态组件
        组件根节点 
    -->
    <transition name="fade">
      <h2 v-if="show">hello</h2>
    </transition>

    <!-- 定制进入和移出的持续时间 -->
    <transition :duration="{ enter: 500, leave: 800 }">
      <!-- ... -->
    </transition>

    <!-- 
      JavaScript 钩子
      推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
      当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
    -->
    <transition v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled" v-on:before-leave="beforeLeave" v-on:leave="leave"
      v-on:after-leave="afterLeave" v-on:leave-cancelled="leaveCancelled">
      <!-- ... -->
    </transition>


    <button @click="show = !show">Toggle</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: true,
    blogTitle: "blogTitle "
  }),

  methods: {
    // --------
    // 进入中
    // --------

    beforeEnter: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      // ...
      done()
    },
    afterEnter: function (el) {
      // ...
    },
    enterCancelled: function (el) {
      // ...
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
      // ...
      done()
    },
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      // ...
    }
  },
}
</script>

<style scoped>
/* 
  过渡的类名  在进入/离开的过渡中，会有 6 个 class 切换

    1. v-enter：进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
    2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
    3. v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
    4. v-leave：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
    5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
    6. v-leave-to：定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

  他们的优先级高于普通的类名
*/
.fade-enter-active {
  transition: all .3s ease;
  animation: bounce-in .5s;
}

.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  animation: bounce-in .5s reverse;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>