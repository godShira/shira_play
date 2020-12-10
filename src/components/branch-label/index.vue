<template lang="pug">
.branch-label.flex.txt-mute
  img.location-icon.mr-6.block(v-if='address' :src='require("./location.png")' alt='定位图标')
  .flex-1
    .txt-h4.mb-6.label(v-for='(label, index) of cptLabelList' :key='index' v-html='label')
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'branch-label',
  props: ['code', 'address', 'distince', 'isShowCode'],
  setup(props) {
    const cptLabelList = computed(() => {
      if (props.address || props.distince) {
        return [props.address, props.distince ? `距您大约${props.distince}` : ''].filter(label => !!label)
      }
      if (props.isShowCode && props.code) return [`营业部代码：${props.code}`]
      return []
    })
    return {
      cptLabelList
    }
  }
}
</script>
<style lang="scss">
.branch-label {
  .label {
    line-height: 1.5;
  }
  .location-icon {
    margin-top: 4px;
    width: 16px;
    height: 16px;
  }
}
</style>
