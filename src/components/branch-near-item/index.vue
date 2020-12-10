<template lang="pug">
.branch-near-item.flex
  .flex-1
    .title.txt-h3.mb-12 {{name}}
    branch-label(:code='code' :address='address' :distince='distince')
  .flex-y.flex-center.ml-6(v-if="cptPhone")
    a.txt-blue(:href="`tel:${cptPhone}`")
      .phone
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'branch-near-item',
  props: ['name', 'code', 'address', 'distince', 'phone', 'location'],
  setup(props) {
    const cptPhone = computed(() => {
      if (props.phone) {
        if (props.phone instanceof Array) return props.phone[0] || ''
        if (typeof props.phone === 'string') return props.phone
      }
      return ''
    })
    return {
      cptPhone
    }
  }
}
</script>
<style lang="scss">
.branch-near-item {
  height: 136px;
  .title {
    line-height: 1.5;
  }
  .phone {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url('./phone.png') no-repeat center;
    background-size: contain;
  }
}
</style>
