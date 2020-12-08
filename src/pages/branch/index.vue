<template lang="pug">
.branch
  bd-map(:list="branch_near_list")
</template>

<script>
import { ref, provide, reactive } from 'vue'
export default {
  name: 'branch',
  setup() {
    let branch_near_list = ref([])
    if (process.env.NODE_ENV === 'development') {
      import('./mock.json').then(res => {
        branch_near_list.value = res.list
      })
    }
    return {
      branch_near_list
    }
  }
}
</script>
