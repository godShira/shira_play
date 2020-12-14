<template lang="pug">
.branch
  branch-search(id="BRANCH_SEARCH_ID" @click="branchSearchEvent")
  bd-map(:list="branch_near_list")
  branch-near-pane(:list="branch_near_list" id="BRANCH_NEAR_PANE_ID")
  branch-city-line(@click="showPicker" :selectedCityTxt="selectedCityTxt")
  branch-item(:list="cptBranchList")
  branch-city-picker(
  v-if='provinceCityList && provinceCityList.length'
  @select="selectDigital"
  :data="provinceCityList"
  :selected-index="selectedIndex"
  ref="pickerDom"
  :title="'选择城市'")
</template>

<script>
import { ref, computed } from 'vue'
import { findBy } from '../../util/arr'
export default {
  name: 'branch',
  setup() {
    let selectedCityTxt = ref('')
    let provinceCityList = ref([])
    let branch_near_list = ref([])
    let branch_all_list = ref([])
    let branch_province_list = ref([])
    let branch_city_list = ref([])
    const globalBranchCode = '005' //TODO 全局拿
    const pickerDom = ref(null)
    const defaultCityColomn = 2
    const selectedIndex = ref([]) //初始化
    const currentCity = ref('')
    if (process.env.NODE_ENV === 'development') {
      import('./branchNear.json').then(res => {
        branch_near_list.value = res.list
      })
      import('./branchAll.json').then(res => {
        branch_all_list.value = res.branchList
        branch_province_list.value = res.provinceList
        branch_city_list.value = res.cityList
        const { cityno, provincenno, cityname } = useCurrentCity(
          globalBranchCode,
          branch_all_list.value,
          branch_city_list.value
        )
        provinceCityList.value = useProvinceCityList(branch_province_list.value, branch_city_list.value)
        selectedCityTxt.value = cityname
        currentCity.value = cityno
        if (provinceCityList.value && provinceCityList.value.length) {
          selectedIndex.value = useCityIndex(cityno, provincenno, provinceCityList.value)
        }
      })
    }
    const selectDigital = (index, item) => {
      if (item && item.length === defaultCityColomn) {
        selectedCityTxt.value = item[1].label
        currentCity.value = item[1].value
      }
    }
    const branchSearchEvent = () => {
      //TODO： search跳转
    }
    const cptBranchList = computed(() => {
      if (currentCity.value) {
        return branch_all_list.value.filter(({ cityno }) => cityno === currentCity.value)
      }
      return branch_all_list.value
    })
    const showPicker = () => {
      pickerDom.value ? pickerDom.value.show() : null
    }
    return {
      showPicker,
      pickerDom,
      selectDigital,
      currentCity,
      cptBranchList,
      branchSearchEvent,
      selectedIndex,
      branch_near_list,
      provinceCityList,
      selectedCityTxt
    }
  }
}

const useProvinceCityList = (branch_province_list, branch_city_list) => {
  return branch_province_list.map(({ provincename, provinceno }) => ({
    label: provincename,
    value: provinceno,
    children: branch_city_list
      .filter(cityItem => cityItem.provincenno === provinceno)
      .map(({ cityname, cityno }) => ({ label: cityname, value: cityno }))
  }))
}
const useCurrentCity = (branchCode, branch_all_list, branch_city_list) => {
  const matchIndex = findBy(branch_all_list, branchCode, 'branchcode')
  const { cityno } = branch_all_list[matchIndex] || {}
  const matchIndex1 = findBy(branch_city_list, cityno, 'cityno')
  const { provincenno, cityname } = branch_city_list[matchIndex1] || {}
  return { cityno, provincenno, cityname }
}
const useCityIndex = (cityno, provincenno, provinceCityList) => {
  const matchIndex = findBy(provinceCityList, provincenno, 'value')
  const childrenList = provinceCityList[matchIndex].children || []
  const matchIndex1 = findBy(childrenList, cityno, 'value')
  return [matchIndex, matchIndex1]
}
</script>
