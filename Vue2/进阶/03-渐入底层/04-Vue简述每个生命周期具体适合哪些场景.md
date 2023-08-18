# 谈谈你对 Vue 生命周期的理解
*  生命周期是什么
**Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。**

* 各个生命周期的作用
1. beforeCreate	在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用

2. created	实例已完成对选项的处理，这些已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，真实 dom 还没有生成，$el 还不可用

3. beforeMount	在挂载开始之前被调用：相关的 render 函数首次被调用

4. mounted	实例被挂载后调用，在当前阶段，真实的 dom 挂载完毕，数据完成双向绑定，可以访问到 dom 节点


5. beforeUpdate	在数据发生改变后，DOM 被更新之前被调用

6. update	在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用

7. activated	keep-alive 专属，被 keep-alive 缓存的组件激活时调用

8. deactivated	keep-alive 专属，被 keep-alive 缓存的组件失活时调用

9. beforeDestroy	实例销毁之前调用

10. destroyed	实例销毁后调用


# 简述每个生命周期具体适合哪些场景
1. beforeCreate：在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用。

2. created：数据 data 、方法 methods 、监听器 watch 和 计算属性 computed都已经被初始化好了，如果要调用 methods 中的方法，或者操作 data 中的数据，最早可以在这个阶段中操作，常用于异步数据获取 。

3. beforeMount： 在挂载开始之前被调用：相关的 render 函数首次被调用。

4. mounted：实例被挂载后调用，在当前阶段，真实的 dom 挂载完毕，可以访问到 dom 。 如果想要操作 dom ，最早可以在这个阶段进行。
**注意 ❗  mounted 不会保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 mounted 内部使用 vm.$nextTick：**
```js
mounted: function () {
  this.$nextTick(function () {
    // 仅在整个视图都被渲染之后才会运行的代码
  })
}
```

5. beforeUpdate：在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它。

6. updated：在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
**注意 ❗，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 updated 里使用 vm.$nextTick：**
```js
updated: function () {
  this.$nextTick(function () {
    //  仅在整个视图都被重新渲染之后才会运行的代码     
  })
}
```

7. beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。

8. destroyed：实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。


# vue 第一次页面加载会触发哪几个钩子

**页面首次渲染会触发 beforeCreate， created， beforeMount， mounted这四个钩子函数。**
- 可以看到 data 更新后才会先后触发beforeUpdate、updated这两个钩子。

- 用户主动vm.$destroyed()要销毁页面后会触发 beforeDestroy、destroyed


# Vue系列之父组件和子组件生命周期钩子函数执行顺序
* Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：
*加载渲染过程：* 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

*子组件更新过程：* 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

*父组件更新过程：* 父 beforeUpdate -> 父 updated

*销毁过程*： 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed


# Vue 应该在哪个生命周期内发起异步请求
* 可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

* 但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：
- 能更快获取到服务端数据，减少页面 loading 时间；
- 服务端渲染 ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

