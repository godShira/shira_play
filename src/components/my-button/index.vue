<template lang="pug">
span.my-button(:class="`button-${type} button-${size}`") {{text}}
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
