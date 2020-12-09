<template lang="pug">
.branch-near-pane
 my-swipe(v-if='list && list.length' @transitionend="transition_end_event")
   my-swipe-item.px-xs( v-for='(item, index) in list' :key='index')
     .branch-near-item {{item.name}}
</template>

<script>
import props from './props'
export default {
  name: 'branch-near-pane',
  props,
  setup() {
    return {
      transition_end_event
    }
  }
}
const transition_end_event = () => {}
</script>
<style lang="scss">
.branch-near-item {
  border-radius: 4px;
  box-shadow: 0 2px 20px 0 rgba(221, 221, 221, 0.5);
  .location-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
