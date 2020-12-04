<template lang="pug">
h1 home
action-sheet(v-model:show="isShow") 我们党发动机公司
</template>

<script>
import { ref } from 'vue'
import ActionSheet from '@/components/action-sheet'

export default {
  name: 'home',
  setup() {
    const isShow = ref(true)
    return {
      isShow
    }
  }
}
</script>
