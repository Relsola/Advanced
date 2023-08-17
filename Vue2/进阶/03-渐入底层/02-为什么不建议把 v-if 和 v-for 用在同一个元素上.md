# 为什么不建议把 v-if 和 v-for 用在同一个元素上

* 因为 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，所以导致每循环一次就会去v-if一次，而v-if是通过创建和销毁dom元素来控制元素的显示与隐藏，所以就会不停的去创建和销毁元素，造成页面卡顿，性能下降。

* 解决办法：
 - 在v-for的外层或内层包裹一个元素来使用v-if
 - 用computed处理

看个例子：
<div v-for="item in [1, 2, 3, 4, 5, 6, 7]" v-if="item !== 3">
    {{item}}
</div>

- 上面的写法是v-for和v-if同时存在，会先把7个元素都遍历出来，然后再一个个判断是否为3，并把3给隐藏掉，这样的坏处就是，渲染了无用的3节点，增加无用的dom操作，建议使用computed来解决这个问题：

<div v-for="item in list">
    {{item}}
</div>

```js
computed() {
    list() {
        return [1, 2, 3, 4, 5, 6, 7].filter(item => item !== 3)
    }
}
```


* 我们也可以把：
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

* 更新为：
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>