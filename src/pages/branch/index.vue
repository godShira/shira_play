<template lang="pug">
.branch
  branch-search(id="BRANCH_SEARCH_ID")
  bd-map(:list="branch_near_list")
  branch-near-pane(:list="branch_near_list" id="BRANCH_NEAR_PANE_ID")
  .txt-bold(@click="showPicker") 打开省市区
  branch-city-picker(
  @select="selectDigital"
  :data="lianDongData"
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
        //console.log(provinceCityList.value)
      })
    }
    const pickerDom = ref(null)
    const lianDongData = [
      {
        value: 1,
        label: '深圳市',
        children: [
          {
            value: 4,
            label: '南山区'
          },
          {
            value: 24,
            label: '龙华区'
          },
          {
            value: 1,
            label: '宝安区'
          },
          {
            value: 23,
            label: '龙岗区'
          },
          {
            value: 3,
            label: '福田区'
          },
          {
            value: 2,
            label: '盐田区'
          }
        ]
      },
      {
        value: 2,
        label: '昆明市',
        children: [
          {
            value: 6,
            label: '五华区'
          },
          {
            value: 7,
            label: '盘龙区'
          },
          {
            value: 8,
            label: '官渡区'
          },
          {
            value: 9,
            label: '西山区'
          },
          {
            value: 10,
            label: '东川区'
          },
          {
            value: 29,
            label: '呈贡区'
          },
          {
            value: 53,
            label: '晋宁区'
          }
        ]
      },
      {
        value: 3,
        label: '广州市',
        children: [
          {
            value: 14,
            label: '越秀区'
          },
          {
            value: 12,
            label: '海珠区'
          },
          {
            value: 11,
            label: '荔湾区'
          },
          {
            value: 13,
            label: '天河区'
          },
          {
            value: 12,
            label: '白云区'
          },
          {
            value: 11,
            label: '黄埔区'
          },
          {
            value: 13,
            label: '南沙区'
          }
        ]
      },
      {
        value: 4,
        label: '上海市',
        children: [
          {
            value: 17,
            label: '浦东新区'
          },
          {
            value: 16,
            label: '徐汇'
          },
          {
            value: 30,
            label: '长宁'
          },
          {
            value: 17,
            label: '普陀'
          },
          {
            value: 16,
            label: '闸北'
          },
          {
            value: 30,
            label: '虹口'
          },
          {
            value: 17,
            label: '杨浦'
          },
          {
            value: 16,
            label: '黄浦'
          },
          {
            value: 30,
            label: '卢湾'
          }
        ]
      }
    ]
    const num0 = 2
    const num1 = 3
    const selectedIndex = [num0, num1] //初始化
    const selectedD = ref('全部')
    const selectDigital = (index, item) => {
      console.log(index, item)
    }
    const showPicker = () => {
      //console.log(pickerDom.value)
      pickerDom.value ? pickerDom.value.show() : null
    }
    return {
      showPicker,
      pickerDom,
      lianDongData,
      selectedD,
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
