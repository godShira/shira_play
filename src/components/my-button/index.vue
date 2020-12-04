<template lang="pug">
.my-button {{props.text}}
</template>
<script>
import { computed } from 'vue'
import props from './props'
import { name } from './config'
export default {
  name,
  props,
  setup(props) {
    return {}
  }
}
</script>
<style lang="scss">
@import './button';
</style>
