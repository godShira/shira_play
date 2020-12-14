<template lang="pug">
.txt-h3.mx-20.py-20.border-b(v-for="(item,index) in list" :key="index") {{item.branchname}}
</template>
<script>
export default {
  name: 'branch-item',
  props: ['list']
}
</script>
