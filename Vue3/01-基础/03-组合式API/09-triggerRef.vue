<template>
    <h1>{{ refObj.age }}</h1>

    <button @click="handle1">改变age</button>
    <button @click="handle2">triggerRef</button>
</template>

<script setup>
import { isRef, shallowRef, triggerRef } from "vue";
// triggerRef 强制更新一个shallowRef 对象的渲染

const obj = {
    name: "Hello World",
    age: 18,
}

const refObj = shallowRef(obj);
console.log(refObj); //true 变得是这个对象，等于这个对象是第一层，对象里面的属性并没有变化

const nameRef = shallowRef(obj.name)
console.log(nameRef);

console.log(isRef(refObj)); // true
console.log(isRef(obj)); // false
console.log(isRef(nameRef)); // true

const handle1 = () => {
    refObj.age = 22
    console.log(refObj.value.age = 22);
}

const handle2 = () => {
    refObj.value.age = 23
    triggerRef(refObj)
    console.log(refObj.age);
}

</script>