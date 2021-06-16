<template>
<!-- eslint-disable -->
  <modal-factory />
  <router-view/>
</template>

// * Vamos registrar o componente de Modal aqui
<script>
/* eslint-disable */
import ModalFactory from './components/ModalFactory'
export default {
  components: { ModalFactory }
}
</script>
