<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="onClick">点我一下</button>
  </div>
</template>

<script>
class Person {
  static title = "post-title"
  constructor(id) {
    this.id = id;
    this.title = Person.title
  }
}

export default {
  // post-title => postTitle
  // props: ["postTitle"],

  props: {
    msg: String,
    num: Number,
    title: String,
    onClick: Function,

    postTitle: {
      // 多个可能的类型
      type: [String, Number],
      // 必填
      required: true,
      // 默认值
      default: "Hello Vue"
    },

    /* 
    注意那些 prop 会在一个组件实例创建之前进行验证
    所以实例的 property 如 data、computed 等
    在 default 或 validator 函数中是不可用的。
    */
    post: {
      // 还可以规定构造器类型
      type: Person,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => ({ id: 1 }),
      // 自定义验证函数
      validator: value => value.id > 0
    }
  },

  data: function () {
    return {
      counter: this.msg.trim().toLowerCase(),
    }
  },

  created() {
    console.log(this.post);
  }
};
</script>

