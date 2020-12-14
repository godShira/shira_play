<template lang="pug">
.branch
  branch-search(id="BRANCH_SEARCH_ID")
  bd-map(:list="branch_near_list")
  branch-near-pane(:list="branch_near_list" id="BRANCH_NEAR_PANE_ID")
  //branch-city(label="城市" :items="provinceCityList" v-model:value="currentCity")
  .txt-bold(@click="showPicker") 打开省市区
  branch-city-picker(@select="selectDigital"
  :data="lianDongData"
  :shadow="true"
  :alias="{name:'displayName'}"
  :selected-index="selectedIndex[1]"
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
    const lianDongData = [
      {
        displayId: 1,
        displayName: '深圳市',
        list: [
          {
            id: 4,
            name: '南山区'
          },
          {
            id: 24,
            name: '龙华区'
          },
          {
            id: 1,
            name: '宝安区'
          },
          {
            id: 23,
            name: '龙岗区'
          },
          {
            id: 3,
            name: '福田区'
          },
          {
            id: 2,
            name: '盐田区'
          }
        ]
      },
      {
        displayId: 2,
        displayName: '昆明市',
        list: [
          {
            id: 6,
            name: '五华区'
          },
          {
            id: 7,
            name: '盘龙区'
          },
          {
            id: 8,
            name: '官渡区'
          },
          {
            id: 9,
            name: '西山区'
          },
          {
            id: 10,
            name: '东川区'
          },
          {
            id: 29,
            name: '呈贡区'
          },
          {
            id: 53,
            name: '晋宁区'
          }
        ]
      },
      {
        displayId: 3,
        displayName: '广州市',
        list: [
          {
            id: 14,
            name: '越秀区'
          },
          {
            id: 12,
            name: '海珠区'
          },
          {
            id: 11,
            name: '荔湾区'
          },
          {
            id: 13,
            name: '天河区'
          },
          {
            id: 12,
            name: '白云区'
          },
          {
            id: 11,
            name: '黄埔区'
          },
          {
            id: 13,
            name: '南沙区'
          }
        ]
      },
      {
        displayId: 4,
        displayName: '上海市',
        list: [
          {
            id: 17,
            name: '浦东新区'
          },
          {
            id: 16,
            name: '徐汇'
          },
          {
            id: 30,
            name: '长宁'
          },
          {
            id: 17,
            name: '普陀'
          },
          {
            id: 16,
            name: '闸北'
          },
          {
            id: 30,
            name: '虹口'
          },
          {
            id: 17,
            name: '杨浦'
          },
          {
            id: 16,
            name: '黄浦'
          },
          {
            id: 30,
            name: '卢湾'
          }
        ]
      }
    ]
    const selectedIndex = [[0], [0, 0], [0, 0, 0]]
    //showPicker(pickerDom)
    const selectedD = ref('全部')
    const selectDigital = (index, item) => {
      console.log(index, item)
      //selectedD.value = item !== '全部' ? item[0].displayName + ' ( ' + item[1].name + ' )' : item
      //this.param.digitalSelect = item
    }
    const showPicker = () => {
      console.log(pickerDom.value)
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
