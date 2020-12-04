<template lang="pug">
h1 home
action-sheet(:show="isShow") 我们党发动机公司
</template>

<script>
import ActionSheet from '@/components/action-sheet'

export default {
  name: 'home',
  components: { ActionSheet },
  setup() {
    return {
      isShow: true
    }
  }
}
</script>
