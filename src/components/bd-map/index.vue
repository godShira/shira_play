<template lang="pug">
#map
</template>

<script>
import BMap from 'BMap'
import { onMounted, reactive, watchEffect, inject, computed, unref, toRaw, ref, shallowRef } from 'vue'
export default {
  name: 'BMap',
  props: ['list'],
  setup(props, context) {
    const branch_near_list = []
    const zoom = 15
    const getInfoPanelContent = item => {}
    const openInfo = (map, item) => {}
    watchEffect(() => {
      const branch_near_list = toRaw(unref(props.list))
      if (branch_near_list && branch_near_list.length) {
        console.log(branch_near_list)
        /* eslint-disable */
        let map = new BMap.Map('map')
        const initX = branch_near_list[0].location[0]
        const initY = branch_near_list[0].location[1]
        map.centerAndZoom(new BMap.Point(initX, initY), zoom)
        branch_near_list.forEach(item => {
          const lng = item.location[0]
          const lat = item.location[1]
          const marker = new BMap.Marker(new BMap.Point(lng, lat))
          marker.addEventListener('click', () => {
            openInfo(map, item)
          })
          map.addOverlay(marker)
        })


      }
    })
    return {
      branch_near_list
    }
  }

}
</script>
<style lang="scss">
#map {
  height: 200px;
}
</style>
