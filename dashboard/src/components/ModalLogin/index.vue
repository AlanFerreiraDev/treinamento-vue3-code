<template>
<!-- eslint-disable -->
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Entre na sua Conta
    </h1>
    <!-- Botão com símbolo de X -->
    <button
      @click="close"
      class="text-4xl text-gray-600 focus:outline-none"
    >
      &times;
    </button>
  </div>

  <div class="mt-10">
    <form
      @submit.prevent="handleSubmit"
    >
      <label class="block">
        <span class="text-lg font-medium text-gray-800">
          E-mail
        </span>
        <!-- A classe via bind, é para se existir a errorMessage, então a classe de cor da borda quando existe erro será aplicada no input -->
        <input
          v-model="state.email.value"
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-transparent rounded"
          placeholder="email@gmail.com"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          >
          <!-- Mensagem de erro no span, uso o !! para trasnformar em booleano, então se for true, ou seja, a mensagem de erro existir, ele vai mostrar -->
          <span
            v-if="!!state.email.errorMessage"
            class="block font-medium text-brand-danger">
            {{ state.email.errorMessage}}
          </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">
          Senha
        </span>
        <!-- A classe via bind, é para se existir a errorMessage, então a classe de cor da borda quando existe erro será aplicada no input -->
        <input
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-transparent rounded"
          placeholder="Sua senha aqui !!!"
          >
          <!-- Mensagem de erro no span, uso o !! para trasnformar em booleano, então se for true, ou seja, a mensagem de erro existir, ele vai mostrar -->
          <span
            v-if="!!state.password.errorMessage"
            class="block font-medium text-brand-danger">
            {{ state.password.errorMessage}}
          </span>
      </label>

      <!-- A classe dinâmica, é pq ele fica com a oppacidade reduzida quando está carregando -->
      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        Entrar
      </button>

    </form>
  </div>
</template>

<script>
/* eslint-disabled */
import { reactive } from '@vue/reactivity'
import useModal from '../../hooks/useModal'
import { useField } from 'vee-validate'
import * as yup from 'yup'
// import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'
import { validateEmptyAndLength3 } from '../../utils/validators'

export default {

  setup () {
    const modal = useModal()

    // * Validação dos campos com vee-validate
    // * ele retorna value e errorMessage da vee-validate, então eu renomeio para fazer o assign no meu modal abaixo
    // const {
    //   value: emailValue,
    //   errorMessage: emailErrorMessage
    // } = useField('email', validateEmptyAndEmail)

    // const userSchema = yup.object().shape({
    //   email: yup.string().email().required(),
    // });

    const {
      value,
      errorMessage
    } = useField('email', yup.string().email('Digite um e-mail válido').required('Este campo é Obrigatório').min(8, 'No minímo 15 caracteres'))

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value,
        errorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    function handleSubmit () {
    }
    // Como eu retorno direto, basta usar a função do useModal e retornar como close
    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
