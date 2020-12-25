<template lang="pug">
.yykh  yykh
#virtua_map
</template>

<script>
import { getAddressCoords } from '@/use'
import { groupArr } from '@/util/arr'
export default {
  name: 'yykh',
  setup() {
    groupArr()
    getAddressCoords('virtua_map', '北京上的积极健康的世界冠军考试大纲', res => {
      console.log(res)
    })
  }
}
</script>
