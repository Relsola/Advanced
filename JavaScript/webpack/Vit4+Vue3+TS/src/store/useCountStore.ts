import { defineStore } from 'pinia';

export default defineStore('count', () => {
  const count = ref(0);
  const increment = () => {
    count.value++;
  };
  return {
    count,
    increment
  };
});
