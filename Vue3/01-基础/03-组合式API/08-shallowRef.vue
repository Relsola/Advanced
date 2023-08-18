<template>
    {{ refObj }}
</template>

<script setup>
import { isRef, shallowRef } from "vue";
// shallowRef 对复杂层级的对象,只将其第一层变成ref响应

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

</script>