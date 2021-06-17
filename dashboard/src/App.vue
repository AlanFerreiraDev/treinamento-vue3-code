// * esse componente sempre será renderizado, independente de qual for a tela, é o component pricnipal da aplicação
<template>
<!-- eslint-disable -->
  <modal-factory />
  <router-view/>
</template>

// * Vamos registrar o componente de Modal aqui
<script>
/* eslint-disable */
import { watch } from 'vue'
import ModalFactory from './components/ModalFactory'
import { useRouter, useRoute } from 'vue-router'
import services from './services'

export default {
  components: { ModalFactory },
  // * Preciso saber se o user está logado ou não, e aquieu consigo, pq toda vez que a rota mudar (ele mudar de pagina), eu vou agir p pegar o path, então para saber a mudança eu uso o router e para pegar as informções eu uso o route
  setup () {
    const router = useRouter()
    const route = useRoute()

    // * Fico escutando a rota, e passo o item que quero pegar, o path
    // * Ver arquivo de routes, o hasAuth
    watch(() => route.path, async () => {
      // * Se o user estiver logado, eu pego o token no localStorage
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')

        // * Se esse token não existir, eu volto par a Home
        if (!token) {
          router.push({ name: 'Home' })
          return
        }

        const { data } = await services.users.getMe()
        console.log(data)
      }
    })
  }
}
</script>
