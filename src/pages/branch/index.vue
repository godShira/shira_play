<template lang="pug">
.branch
  .search(style="height: 100px" id="BRANCH_SEARCH_ID") 1222
  bd-map(:list="branch_near_list")
  branch-near-pane(:list="branch_near_list" id="BRANCH_NEAR_PANE_ID")
  branch-city(label="城市" :items="provinceCityList" v-model:value="currentCity")
</template>

<script>
import { ref } from 'vue'
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

    return {
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
