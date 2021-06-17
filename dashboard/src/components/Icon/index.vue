<template>
<!-- Uso o v-bind="$props, para passar as props par abaixo" -->
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Loading from './Loading.vue'

export default {
  components: { Loading },
  props: {
    name: { type: String, required: true }
  }

}
</script>

<style>

</style>
