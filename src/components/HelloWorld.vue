<template lang="pug">
.hello
  h1 {{ cptMsg }}

</template>

<script>
import { computed } from 'vue'
export default {
  name: 'HelloWorld',
  props: ['msg'],
  setup(prop, context) {
    const { props } = context
    const cptMsg = computed(() => props.msg + '1')
    return { cptMsg }
  }
}
</script>
