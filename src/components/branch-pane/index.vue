<template lang="pug">
.branch-pane
  .px-20.py-16.txt-mute {{title}}
  .px-32.py-32(v-if='list && list.length')
    .px-8.py-8.border-b.txt-h4.flex(v-for='({label,value},index) of list' :key="index" @click='$emit("click",label,value)')
      .txt-info.flex-1 {{label}}
      .txt-mute {{value}}
  .py-16.px-16.txt-h4.txt-info.txt-center(v-else) {{`暂无${title}数据`}}
</template>

<script>
export default {
  name: 'branch-pane',
  props: ['title', 'list']
}
</script>
