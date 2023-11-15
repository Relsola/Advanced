<!-- 
  组件是可以在它们自己的模板中调用自身的
  不过它们只能通过 name 选项来做这件事
  稍有不慎，递归组件就可能导致无限循环
 -->
<template>
  <div>
    <h1>Demo</h1>
    <Demo />
  </div>
</template>

<script>
export default { name: "Demo" };
</script>