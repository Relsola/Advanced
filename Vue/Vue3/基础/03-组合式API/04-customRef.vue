<template>
    <h1>{{ num }}</h1>

    <button @click="handle">num++</button>
</template>

<script setup>
import { customRef, onRenderTracked, onRenderTriggered } from "vue";

/* 
  customRef 自定义一个ref对象，把ref对象改成成set/get，
  进一步可以为他们添加Track和Trigger

  customRef参数又是一个函数 参数函数有两个参数 这两个参数也是两个函数
  第一个参数得作用是 当你执行get的时候 追踪你的数据变化
  第二个参数的作用是 当你执行set的时候 追踪你的数据变化
*/

const num = customRef((track, trigger) => {
    let value = 10;
    return {
        get() {
            // 当我们获取值的时候 走get 这时候value被返回,就是我们所需要的值
            // 当你调用track的时候 会自动的调用onRenderTracked函数
            track()
            console.log("get");
            return value;
        },
        set(val) {
            // 当你调用trigger的时候 会自动的调用onRenderTriggered函数
            trigger();
            console.log("set");
            value = val;
        }
    }
})

onRenderTracked(ev => {
    console.log("onRenderTracked");
});

onRenderTriggered(ev => {
    console.log("onRenderTriggered");
});

const handle = () => {
    num.value++;
};

</script>