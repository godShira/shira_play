<template lang="pug">
.my-button(:class="`button-${size} button-${type}`")
  span.btn
    slot {{text}}
</template>
<script>
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
@import './my-button';
</style>
