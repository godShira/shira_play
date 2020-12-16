<template lang="pug">
branch-search.border-b(id="BRANCH_SEARCH_ID" @click="" v-model:value="query")
branch-pane(v-if='query' title='搜索结果' :list="cptMatchedList" @click="onSelect")
branch-pane(v-else title='搜索历史' :list="historyBranchList" @click="onSelect")
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'branchsearch',
  setup() {
    const store = useStore()
    console.log(store.getters.BRANCH_ALL_LIST)
    const query = ref(null)
    return {
      query
    }
  }
}
</script>
