<template lang="pug">
.branch-city(v-if='items && items.length')
  .txt-bold(v-for='(item,index) in items' :key="index") {{item.label}}
  action-sheet(:show="true" title="城市" :isConfirmShow="true" :round="false")
    .prov-city-cnt.px-12.relative.hidden(style='height: 250px')
      .prov-wrap.txt-center(ref="provWrapDom")
        .txt-h3.py-16(v-for='(prov,index) in items' :key="index" :ref="index===(items.length-1)?'firstDom':''") {{prov.label}}{{prov.value}}
      .city-wrap.txt-center
        .txt-h3.py-16(v-for='(city,index) in cptCityList' :key="index") {{city.label}}{{city.value}}
</template>
<script>
import { ref, computed, onMounted, watchEffect } from 'vue'
export default {
  name: 'branch-city',
  props: ['items', 'value'],
  setup(props) {
    const firstDom = ref(null)
    const provWrapDom = ref(null)
    const t1 = ref(null)
    const t2 = ref(null)
    let timer = null
    const handleScroll = event => {
      console.log(event)
      if (event.currentTarget) {
        console.log('开始滚动')
        const num = 5
        const timeoutSeconds = 500
        const firstDomRect = firstDom.value.getBoundingClientRect()
        const canSeeHeight = firstDomRect.height * num
        const provItemLength = firstDomRect.height * props.items.length
        t1.value = document.body.clientHeight + provItemLength - canSeeHeight - firstDomRect.bottom
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          t2.value = document.body.clientHeight + provItemLength - canSeeHeight - firstDomRect.bottom
          if (t1.value === t2.value) {
            console.log('结束了')
            if (provWrapDom.scrollTo) {
              console.log('scrollTo')
              provWrapDom.scrollTo(0, Math.round(firstDomRect.top / 50) * 50)
            } else {
              console.log('scrollToelse')
              console.log(provWrapDom)
              provWrapDom.scrollTop = Math.round(firstDomRect.top / 50) * 50
            }
          }
        }, timeoutSeconds)
        console.log(t1)
      }
    }
    onMounted(() => {
      watchEffect(() => {
        if (provWrapDom.value) {
          provWrapDom.value.addEventListener('scroll', handleScroll)
        }
      })
    })
    const cptCityList = computed(() => {
      return [{ label: 'aaa', value: '111' }]
    })
    return {
      cptCityList,
      firstDom,
      provWrapDom
    }
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
