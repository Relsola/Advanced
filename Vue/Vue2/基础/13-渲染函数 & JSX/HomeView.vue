<template>
  <div>
    <Demo :level="1">Hello world!</Demo>
    <aax />
  </div>
</template>

<script>
// import Demo from "@/components/Demo.vue"

export default {
  components: {
    Demo: {
      render: function (createElement) {
        return createElement(
          'h' + this.level,   // 标签名称
          this.$slots.default // 子节点数组
        )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    },

    aax: {
      // @returns {VNode}
      render: function (createElement) {
        console.log(this);

        return createElement(
          // 必填项 {String | Object | Function}
          //  HTML标签名、组件选项对象，resolve 了上述任何一种的一个 async 函数
          'div',

          // {Object} 一个与模板中 attribute 对应的数据对象,可选。
          {
            // v-bind:class
            'class': { div: true },

            // v-bind:style
            style: { color: 'skyblue' },

            // 普通的 HTML attribute
            attrs: { id: 'aax' },

            // 组件 prop
            // props: { msg: 'Hello Vue' },

            // DOM property
            // domProps: { innerHTML: 'baz' },

            // v-on 不支持修饰器。
            on: { click: this.clickHandler },

            // 仅用于组件，用于监听原生事件，而不是组件内部使用
            // `vm.$emit` 触发的事件。
            // nativeOn: {
            //   click: this.blogTitle += "EH"
            // },

            // 自定义指令
            directives: [
              {
                name: 'cope',
                value: '2',
                expression: '1 + 1',
                arg: 'foo',
                modifiers: {
                  bar: true
                }
              }
            ],

            // 作用域插槽的格式为
            // { name: props => VNode | Array<VNode> }
            scopedSlots: {
              default: props => createElement('span', props.text)
            },

            // 如果组件是其它组件的子组件，需为插槽指定名称
            slot: 'name-of-slot',
            // 其它特殊顶层 property
            key: 'myKey',
            ref: 'myRef',
            // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
            // 那么 `$refs.myRef` 会变成一个数组。
            refInFor: true
          },

          // {String | Array}
          // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
          // 也可以使用字符串来生成“文本虚拟节点”。可选。
          [
            this.blogTitle,
            createElement('h1', '一则头条'),
            createElement(Demo, { props: { level: 2 } }),
          ])
      },

      data: () => ({
        blogTitle: "blogTitle",
        div: "div"
      }),

      methods: {
        clickHandler() {
          this.blogTitle = this.blogTitle.split('').reverse().join('');
        }
      }
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