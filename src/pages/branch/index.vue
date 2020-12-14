<template lang="pug">
.branch
  branch-search(id="BRANCH_SEARCH_ID")
  bd-map(:list="branch_near_list")
  branch-near-pane(:list="branch_near_list" id="BRANCH_NEAR_PANE_ID")
  .txt-bold(@click="showPicker") 打开省市区
  branch-city-picker(
  v-if='provinceCityList && provinceCityList.length'
  @select="selectDigital"
  :data="provinceCityList"
  :selected-index="selectedIndex"
  ref="pickerDom"
  :title="'选择城市'")
</template>

<script>
import { ref, onMounted } from 'vue'
import { findBy } from '../../util/arr'
export default {
  name: 'branch',
  setup() {
    let provinceCityList = ref([])
    let branch_near_list = ref([])
    let branch_all_list = ref([])
    let branch_province_list = ref([])
    let branch_city_list = ref([])
    const globalBranchCode = '007' //TODO 全局拿
    let currentCity = ref('')
    if (process.env.NODE_ENV === 'development') {
      import('./branchNear.json').then(res => {
        branch_near_list.value = res.list
      })
      import('./branchAll.json').then(res => {
        branch_all_list.value = res.branchList
        branch_province_list.value = res.provinceList
        branch_city_list.value = res.cityList
        currentCity.value = useCurrentCity(globalBranchCode, branch_all_list.value)
        provinceCityList.value = useProvinceCityList(branch_province_list.value, branch_city_list.value)
      })
    }
    const pickerDom = ref(null)
    const num0 = 2
    const num1 = 2
    const selectedIndex = [num0, num1] //初始化
    const selectDigital = (index, item) => {
      console.log(index, item)
    }
    const showPicker = () => {
      pickerDom.value ? pickerDom.value.show() : null
    }
    return {
      showPicker,
      pickerDom,
      selectDigital,
      selectedIndex,
      branch_near_list,
      currentCity,
      provinceCityList
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
const useCurrentCity = (branchCode, branch_all_list) => {
  const matchIndex = findBy(branch_all_list, branchCode, 'branchcode')
  const { cityno } = branch_all_list[matchIndex] || {}
  return cityno
}
</script>
