<template lang="pug">
#map(:style='`height: ${ height }px`')
</template>

<script>
import BMap from 'BMap'
import { ref, onMounted, watchEffect } from 'vue'
import props from './props'
export default {
  name: 'BMap',
  props,
  setup(props, context) {
    watchEffect(() => {
      const branch_near_list = [...props.list]
      if (branch_near_list && branch_near_list.length) {
        console.log(branch_near_list)
        let map = new BMap.Map('map')
        const initX = branch_near_list[0].location[0]
        const initY = branch_near_list[0].location[1]
        map.centerAndZoom(new BMap.Point(initX, initY), props.zoom)
        markersClickEvent(branch_near_list, map)
      }
    })
    return {
      height: useInitMapHeight()
    }
  }
}
const useInitMapHeight = () => {
  const defaultHeight = 480
  const height = ref(defaultHeight)
  onMounted(() => {
    const searchDom = document.getElementById('BRANCH_SEARCH_ID')
    height.value = document.body.offsetHeight
    if (searchDom) {
      height.value -= searchDom.clientHeight
    }
    const paneDom = document.getElementById('BRANCH_NEAR_PANE_ID')
    if (paneDom) {
      height.value -= paneDom.clientHeight
    }
  })
  return height
}
const markersClickEvent = (list, map) => {
  list.forEach(item => {
    const lng = item.location[0]
    const lat = item.location[1]
    const marker = new BMap.Marker(new BMap.Point(lng, lat))
    marker.addEventListener('click', e => {
      console.log(e)
      openInfo(map, item)
    })
    map.addOverlay(marker)
  })
}
const openInfo = (map, item) => {
  const point = new BMap.Point(item.location[0], item.location[1])
  const content = `<div id="BRANCH_INFO_${item.code}" class="txt-mute">${item.address}</div>`
  const infoWindow = new BMap.InfoWindow(content, { title: item.name + '  ' })
  map.openInfoWindow(infoWindow, point)
}
</script>
