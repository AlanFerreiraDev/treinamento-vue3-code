// * A idéia desse componente é ele ser uma factory que cria modais dependendo do parametro que eu passo p ele
<template>
<!-- eslint-disable -->
<!-- eslint no-use-before-define: 0  -->
<!-- Essa tag teleport é relacionado a portal, exemplo de se colocar o modal em um botão, mas ele renderizar em outro lugar, como o modal é fixo, ele poderia herdar o elemento relativo, e nesse caso ele não herda de niguém -->
<teleport to='body'>
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToogle({ status: false })"
    >
      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
        >
        <!-- O animate__animated é para falar que é animado mesmo, o animate_fadeinDown é para fazer a animação de cima par abaixo e o faster trata-se da velocidade da animação -->
        <div class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">

          <div class="flex flex-col px-12 py-10 bg-white">
            <!-- Aqui vai ficar o componente dinâmico -->
            <!-- Agora el evai enxergar o model e assim que ele ver o parametro, ele vai modificar a tag e virar o modal que ele encontrar no model (objeto exportado ) -->
            <component :is="state.component"></component>
          </div>

        </div>

      </div>

    </div>
  </teleport>

</template>

<script>
// eslint-disable
/* eslint no-use-before-define: 0 */

import { reactive, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import useModal from '../../hooks/useModal'

//* Importo para registrar esse modal no Factory
//* Detalhe que importo como compoennte assincorno
const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalCreateAccount = defineAsyncComponent(() => import('../ModalCreateAccount'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    ModalLogin,
    ModalCreateAccount
  },
  setup () {
    const modal = useModal()
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    // * quando o componenente for montado
    onMounted(() => {
      modal.listen(handleModalToogle)
    })

    // * E antes de desmontar
    onBeforeUnmount(() => {
      modal.off(handleModalToogle)
    })

    function handleModalToogle (payload) {
      // * Condições para setar os parametros qu evem pela função
      //* Se for true, estou montando, então preciso passar as informações
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }
      state.isActive = payload.status
    }

    return {
      // * Retorno o state, para ficar disponivel no meu componente
      state,
      handleModalToogle
    }
  }
}
</script>
