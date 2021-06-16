// * Vamos criar uma API para utilizar os eventos
/* eslint-disable */
import bus from "../utils/bus";
const EVENT_NAME = "modal:toogle";

export default function useModal() {
  // * Vai abrir o modal, e faz a emissão de um evento com o status obrigatório: true
  function open(payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload });
  }
  // * Vai fechar o modal, e faz a emissão de um evento com o status obrigatório: false
  function close(payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload });
  }
  // *Para ficar ouvindo a função
  function listen(fn) {
    bus.on(EVENT_NAME, fn);
  }
  // *Para saber a função que deseja finalizar a escutA
  function off(fn) {
    bus.off(EVENT_NAME, fn);
  }
  // * Aqui ele já vai retornar algumas funções que a API precisa prover
  return { open, close, listen, off };
}
