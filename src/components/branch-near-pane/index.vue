<template lang="pug">
.branch-near-pane.px-12.py-12
  .px-16.swipe-wrap
    my-swipe.py-16(v-if='list && list.length' @transitionend="transition_end_event")
      my-swipe-item(v-for='(item, index) in list' :key='index')
        branch-near-item(v-bind="item")
  .txt-center.txt-mute.pt-12
    img.arrow_up.mb-6(:src="require('./arrow_up.png')")
    .txt-h6 上拉显示更多结果

</template>

<script>
import props from './props'
export default {
  name: 'branch-near-pane',
  props,
  setup(props) {
    return {
      transition_end_event
    }
  }
}
const transition_end_event = () => {}
</script>
<style lang="scss">
.branch-near-pane {
  background: #cccccc;
  .arrow_up {
    width: 16px;
  }
  .swipe-wrap {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 20px 0 rgba(221, 221, 221, 0.5);
  }
}
</style>
