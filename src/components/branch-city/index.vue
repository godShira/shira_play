<template lang="pug">
.branch-city(v-if='items && items.length')
  .txt-bold(v-for='(item,index) in items' :key="index") {{item.label}}
  action-sheet(:show="true" title="城市" :isConfirmShow="true" :round="false")
    .prov-city-cnt.px-12.relative.hidden(style='height: 250px')
      .prov-wrap.txt-center(ref="provWrapDom")
        .txt-h3.py-16(v-for='(prov,index) in items' :key="index" :ref="index===(items.length-1)?'provLastDom':''") {{prov.label}}{{prov.value}}
      .city-wrap.txt-center(ref="cityWrapDom" v-if="items")
        .txt-h3.py-16(v-for='(city,index) in cptCityList(items,provIndex)' :key="index" :ref="index===(cptCityList(items,provIndex).length-1)?'cityLastDom':''") {{city.label}}{{city.value}}
</template>
<script>
import { ref, computed, onMounted, watchEffect, unref } from 'vue'
export default {
  name: 'branch-city',
  props: ['items', 'value'],
  setup(props) {
    return {
      cptCityList,
      ...useProvScroll(props, defaultSelectNum)
    }
  }
}
const defaultSelectNum = 2
const cptCityList = (items, provIndex = defaultSelectNum) => {
  const cityList = ref(null)
  watchEffect(() => {
    cityList.value = items.length && items[provIndex] ? items[provIndex].children : items[defaultSelectNum].children
  })
  return cityList.value
}

const useProvScroll = (props, defaultSelectNum) => {
  const provLastDom = ref(null)
  const provWrapDom = ref(null)
  const t1 = ref(null)
  const t2 = ref(null)
  const provIndex = ref(null)
  let timer = null
  const handleScroll = event => {
    if (event.currentTarget) {
      const num = 5
      const timeoutSeconds = 500
      const provLastDomRect = provLastDom.value.getBoundingClientRect()
      const canSeeHeight = provLastDomRect.height * num
      const provItemLength = provLastDomRect.height * props.items.length
      t1.value = document.body.clientHeight + provItemLength - canSeeHeight - provLastDomRect.bottom
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        t2.value = document.body.clientHeight + provItemLength - canSeeHeight - provLastDomRect.bottom
        if (t1.value === t2.value) {
          if (provWrapDom.value.scrollTo) {
            provWrapDom.value.scrollTo(0, Math.round(t1.value / provLastDomRect.height) * provLastDomRect.height)
          } else {
            provWrapDom.value.scrollTop = Math.round(t1.value / provLastDomRect.height) * provLastDomRect.height
          }
          provIndex.value = Math.round(t1.value / provLastDomRect.height) + defaultSelectNum
        }
      }, timeoutSeconds)
    }
  }
  onMounted(() => {
    watchEffect(() => {
      if (provWrapDom.value) {
        provWrapDom.value.addEventListener('scroll', handleScroll)
      }
    })
  })
  return {
    provLastDom,
    provWrapDom,
    provIndex
  }
}
</script>
<style lang="scss">
.branch-city {
  .prov-city-cnt:before {
    bottom: 100px;
  }
  .prov-city-cnt:after {
    bottom: 150px;
  }
  .prov-city-cnt:before,
  .prov-city-cnt:after {
    content: '';
    position: fixed;
    width: 100%;
    height: 1px;
    background: #eee;
  }
  .prov-wrap,
  .city-wrap {
    position: absolute;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    width: 50%;
    bottom: 0;
  }
  .prov-wrap {
    left: 0;
    top: 0;
  }
  .city-wrap {
    right: 0;
    top: 100px;
  }
}
</style>
