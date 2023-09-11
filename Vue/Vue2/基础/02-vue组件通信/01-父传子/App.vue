<template>
  <!-- v-bind="post" => :id = id  :title = Person.title -->
  <Demo post-title="Hello Vue" :msg="msg" :num="42" :post="post" v-bind="post" :onClick="onClick" />
</template>

<script>
class Person {
  static title = "post-title"
  constructor(id) {
    this.id = id;
    this.title = Person.title
  }
}

import Demo from "./components/Demo.vue";

export default {
  data: () => ({
    msg: "Message",
    post: new Person(1),
  }),
  components: { Demo },
  methods: {
    onClick() {
      console.log("调用父组件事件");
    }
  }
}
</script>
