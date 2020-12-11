<template lang="pug">
.branch-city(v-if='items && items.length')
  .txt-bold(v-for='(item,index) in items' :key="index") {{item.label}}
  action-sheet(:show="true" title="城市" :isConfirmShow="true" :round="false")
    .prov-city-cnt.px-12.relative.hidden(style='height: 250px')
      .prov-wrap.txt-center(ref="provWrapDom")
        .item.txt-h3.py-16.txt-ellipsis(v-for='(prov,index) in items' :key="index" :ref="index===(items.length-1)?'provLastDom':''") {{prov.label}}{{prov.value}}
      .city-wrap.txt-center(ref="cityWrapDom" v-if="items")
        .item.txt-h3.py-16.txt-ellipsis(v-for='(city,index) in cptCityList(items,provIndex)' :key="index" :ref="index===(cptCityList(items,provIndex).length-1)?'cityLastDom':''") {{city.label}}{{city.value}}
</template>
<script>
import { ref, computed, onMounted, watchEffect, unref } from 'vue'
export default {
  name: 'branch-city',
  props: ['items', 'value'],
  setup(props) {
    return {
      cptCityList,
      ...useProvScroll(props),
      ...useCityScroll(props)
    }
  }
}

const defaultProvinceNum = 0
const cptCityList = (items, provIndex = defaultProvinceNum) => {
  const cityList = ref(null)
  watchEffect(() => {
    cityList.value = items.length && items[provIndex] ? items[provIndex].children : items[defaultProvinceNum].children
  })
  return cityList.value
}

const useCityScroll = props => {
  const cityLastDom = ref(null)
  const cityWrapDom = ref(null)
  const cityIndex = ref(null)
  const nullNum = 2
  const handleScroll = event => {}
  onMounted(() => {
    watchEffect(() => {
      if (cityWrapDom.value) {
        const provLastDomRect = cityLastDom.value.getBoundingClientRect()
        cityWrapDom.value.style.paddingTop = provLastDomRect.height * nullNum + 'px'
        cityWrapDom.value.style.paddingBottom = provLastDomRect.height * nullNum + 'px'
        cityWrapDom.value.addEventListener('scroll', handleScroll)
      }
    })
  })
  return {
    cityLastDom,
    cityWrapDom,
    cityIndex
  }
}
const useProvScroll = props => {
  const defaultNullNum = 2
  const provLastDom = ref(null)
  const provWrapDom = ref(null)
  const t1 = ref(null)
  const t2 = ref(null)
  const provIndex = ref(null)
  let timer = null
  const handleScroll = event => {
    if (event.currentTarget) {
      const num = 5
      const timeoutSeconds = 200
      const provLastDomRect = provLastDom.value.getBoundingClientRect()
      const canSeeHeight = provLastDomRect.height * num
      const provItemLength = provLastDomRect.height * props.items.length
      const clientHeight = document.body.clientHeight
      const plusHeight = clientHeight + provItemLength + provLastDomRect.height * defaultNullNum
      t1.value = plusHeight - canSeeHeight - provLastDomRect.bottom
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        t2.value = plusHeight - canSeeHeight - provLastDomRect.bottom
        if (t1.value === t2.value) {
          if (provWrapDom.value.scrollTo) {
            provWrapDom.value.scrollTo(0, Math.round(t1.value / provLastDomRect.height) * provLastDomRect.height)
          } else {
            provWrapDom.value.scrollTop = Math.round(t1.value / provLastDomRect.height) * provLastDomRect.height
          }
          provIndex.value = Math.round(t1.value / provLastDomRect.height)
        }
      }, timeoutSeconds)
    }
  }
  onMounted(() => {
    watchEffect(() => {
      if (provWrapDom.value) {
        const provLastDomRect = provLastDom.value.getBoundingClientRect()
        provWrapDom.value.style.paddingTop = provLastDomRect.height * defaultNullNum + 'px'
        provWrapDom.value.style.paddingBottom = provLastDomRect.height * defaultNullNum + 'px'
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
    width: 40%;
    padding: 0 5%;
    bottom: 0;
    .item {
      width: 100%;
      height: 18px;
    }
  }
  .prov-wrap {
    left: 0;
    top: 0;
  }
  .city-wrap {
    right: 0;
    top: 0;
  }
}
</style>
