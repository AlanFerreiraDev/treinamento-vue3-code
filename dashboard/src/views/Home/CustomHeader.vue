<template>
<!-- Esse header tem um tamamnho especifico, então ele vai ser feito com uma classe especifica -->
  <header class="header">
    <div class="header-group">
      <div class="flex items-center justify-between py-10">
        <!-- o lg é de large, então é como se a partir dessa medida lg, o tamanho máximo de width se torne 36  -->
        <div class="w-28 lg:w-36">
          <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
        </div>
        <div class="flex">
          <button
            @click="() => emit('create-account')"
            class="px-6 py-2 font-bold rounded-full text-white focus:outline-none">
            Crie uma Conta
          </button>

          <button
            @click="() => emit('login')"
            class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none">
            Entrar
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Tenha um feedback. <br>
                                      <!-- Para não quebara no mobile, primeiramente ele aparece como hidden e se for p mobile ele age como block -->
          E faça seus clientes mais <br class="hidden lg:inline-block">
          felizes!
        </h1>
        <p class="text-lg font-medium text-white">
          Receba idéias, reclamações e feedbacks com um <br class="hidden lg:inline-block"> simples widget na página.
        </p>
        <div>
          <!-- Como el,e tem o emit lá embaixo, quando ele for clicado pelo evento ele dispara o evento login -->
          <button
            class="px-6 py-2 font-bold mt-10 bg-white rounded-full text-brand-main focus:outline-none"
            >
            Crie uma conta grátis
          </button>
        </div>

      </div>

    </div>
  </header>
</template>

<script>
/* eslint-disable */
export default {
  // * Esse emit é do objeto de contexto, então eu tiro de dentro dele o evento emit
  setup (_, { emit }) {
    return { emit }
  }
}
</script>

<style lang="postcss" scoped>
  .header {
    /* Para aplicar as classes do tailwind */
    @apply bg-brand-main w-full flex justify-center;
    height: 700px;
  }

  .header-group {
    @apply flex flex-col w-4/5 max-w-6xl;
  }

  @media (min-width: 640px) {
    .header-group {
      background-image: url('../../assets/images/blue-baloons.png');
      background-size: 628px;
      background-position: 90% 100%;
      background-repeat: no-repeat;
    }
  }

</style>
