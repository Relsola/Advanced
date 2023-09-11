<template>
  <div>
    <h2>{{ msg }}</h2>
    <button @click="getAll">查看值</button>

    <p>单选checkbox----</p>
    <input type="checkbox" v-model="oneCheckbox" />
    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no">
    <p>{{ toggle }}</p>

    <p>多选checkbox----</p>
    <input type="checkbox" v-model="moreCheckbox" value="1" />
    <input type="checkbox" v-model="moreCheckbox" value="2" />
    <input type="checkbox" v-model="moreCheckbox" value="3" />

    <p>radio-------</p>
    <input type="radio" value="男" name="sex" v-model="radio" />
    <input type="radio" value="女" name="sex" v-model="radio" />

    <p>select---------</p>
    <select name="" v-model="select">
      <option value="默认" selected disabled>默认</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
</template>

<script>
export default {
  data: () => ({
    msg: "Hello Vue",
    oneCheckbox: true,
    toggle: "one",
    moreCheckbox: [],
    radio: null,
    select: 1,
  }),

  methods: {
    getAll() {
      console.log(this.oneCheckbox);
      console.log(this.moreCheckbox);
      console.log(this.radio);
      console.log(this.select);
    },
  },
};
</script>
