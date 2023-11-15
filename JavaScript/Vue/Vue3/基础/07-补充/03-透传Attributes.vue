<template>
    <!-- <MyButton> 的模板 -->
    <button>click me</button>
    <!-- 一个父组件使用了这个组件，并且传入了 class -->
    <MyButton class="large" />
    <!-- 结果 -->
    <button class="large">click me</button>


    <!-- 对 class 和 style 的合并 -->
    <button class="btn">click me</button>
    <!-- 最后渲染出的 DOM 结果 -->
    <button class="btn large">click me</button>


    <!-- 同样的规则也适用于 v-on 事件监听器 -->
    <MyButton @click="onClick" />
    <!-- 
        click 监听器会被添加到 <MyButton> 的根元素，即那个原生的 <button> 元素之上。
        当原生的 <button> 被点击，会触发父组件的 onClick 方法。
        同样的，如果原生 button 元素自身也通过 v-on 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发 
    -->


    <!-- 
        有些情况下一个组件会在根节点上渲染另一个组件。
        例如，我们重构一下 <MyButton>，让它在根节点上渲染 <BaseButton>
      -->
    <!-- <MyButton/> 的模板，只是渲染另一个组件 -->
    <BaseButton />
    <!-- 
        此时 <MyButton> 接收的透传 attribute 会直接继续传给 <BaseButton>。
        请注意：
        1. 透传的 attribute 不会包含 <MyButton> 上声明过的 props 或是针对 emits 声明事件的 v-on 侦听函数，换句话说，声明过的 props 和侦听函数被 <MyButton>“消费”了。
        2. 透传的 attribute 若符合声明，也可以作为 props 传入 <BaseButton>。
     -->


    <!-- 这些透传进来的 attribute 可以在模板的表达式中直接用 $attrs 访问到。 -->
    <span>Fallthrough attribute: {{ $attrs }}</span>
    <!-- 
        这个 $attrs 对象包含了除组件所声明的 props 和 emits 之外的所有其他 attribute，例如 class，style，v-on 监听器等等。
        有几点需要注意：
        1. 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 $attrs['foo-bar'] 来访问。
        2. 像 @click 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 $attrs.onClick。
     -->


    <!-- 
        我们想要所有像 class 和 v-on 监听器这样的透传 attribute 都应用在内部的 <button> 上而不是外层的 <div> 上。
        我们可以通过设定 inheritAttrs: false 和使用 v-bind="$attrs" 来实现 
    -->
    <div class="btn-wrapper">
        <button class="btn" v-bind="$attrs">click me</button>
    </div>




    <!-- 
        多根节点的 Attributes 继承 

        和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。
        如果 $attrs 没有被显式绑定，将会抛出一个运行时警告
    -->

    <CustomLayout id="custom-layout" @click="changeValue" />

    <!-- 如果 <CustomLayout> 有下面这样的多根节点模板，由于 Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告。 -->
    <header>...</header>
    <main>...</main>
    <footer>...</footer>

    <!-- 如果 $attrs 被显式绑定，则不会有警告 -->
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
</template>
<script setup>
// 如果需要，你可以在 < script setup > 中使用 useAttrs() API 来访问一个组件的所有透传 attribute
import { useAttrs } from 'vue';

// 禁用 Attributes 继承
defineOptions({
    inheritAttrs: false,
});
// ...setup 逻辑

const attrs = useAttrs();
/* 
  这里的 attrs 对象总是反映为最新的透传 attribute，但它并不是响应式的
  你不能通过侦听器去监听它的变化。
  如果你需要响应性，可以使用 prop。或者你也可以使用 onUpdated() 
  使得在每次更新时结合最新的 attrs 执行副作用。
*/
</script>