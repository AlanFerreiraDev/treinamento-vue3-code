// * No Vue 3, voce não precisa usar um elemento apenas no root da aplicação, ou seja, vc pode colocar mais de um elemento seguido
<template>
<!-- eslint-disable  -->
  <custom-header
    @create-account="handleAccountCreate"
    @login="handleLogin"
  />
  <contact />
  <!-- A classe está sendo renderizada em cima do tailwind, no arquivo tailwind.config.js vc pode ver essas configurações -->
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker © 2021</p>
  </div>

</template>

<script>
/* eslint-disable */
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import useModal from '../../hooks/useModal'

export default {
  components: { CustomHeader, Contact },
  setup() {
    // * Hook de router para fazer os links
    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      // * Quando a aplicaçõa montar eu vou tentar pegar o token do localStorage
      const token = window.localStorage.getItem('token')
      if(token) {
        // * Se o token existir, mandar o token par a arota de feedbacks
        router.push({ name : 'Feedbacks'})
      }
    })

    function handleLogin() {
      modal.open({
        component: 'ModalLogin'
      })

    }

    function handleAccountCreate() {
      modal.open({
        component: 'ModalAccountCreate'
      })

    }

    // * Retorno aqui parta que eu consiga usar no meu template
    return {
      handleLogin,
      handleAccountCreate
    }
  }

}
</script>
