<template lang="pug">
h1 home
action-sheet(:show="isShow") 我们党发动机公司
</template>

<script>
export default {
  name: 'home',
  setup() {
    return {
      isShow: true
    }
  }
}
</script>
