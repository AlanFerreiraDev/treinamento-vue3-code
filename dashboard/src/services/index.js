/* eslint-disable */
import axios from "axios";
import router from "../router";
import AuthService from "./auth";
import UsersService from "./users";

const API_ENVS = {
  production: "https://backend-treinamento-vue3.vercel.app",
  development: "",
  local: "http://localhost:3000"
};

const httpClient = axios.create({
  baseURL: API_ENVS.local
});

//* Vamos interceptar todas as requests para colocar o token em todas as requisições
httpClient.interceptors.request.use(config => {
  const token = window.localStorage.getItem("token");

  if (token) {
    // * Nome do token na requisição via Insomnia para pegar os dados do usuario
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

//* Vamos interceptar o serviço, para el enão ficar disparando para qualquer erro
// * Posso ter o interceptor de sucesso ou de erro, vamois lidar aqui com o de erro
httpClient.interceptors.response.use(
  response => response,
  error => {
    // * Se esses dois tipos de erro cvaírem no nosso try catch, eu vou tratar, pq os outros eu estou preparado para lidar na API
    //* Agora o erro só vai ser taxado com o toast, quando realmente for um erro, pq a API está preparada para lidar com erros 404, 400, e 401
    const canThrowAnError =
      error.request.status === 0 || error.request.status === 500;
    if (canThrowAnError) {
      throw new Error(error.message);
    }
    // * Verificação de erro, se por acaso tiver invasão e o cara mandar um token falso
    // * Se o token não for válido, ele vai retornar 401, então se o status da resposta de erro for 401, ele redireciona pra Home
    if (error.response.status === 401) {
      router.push({ name: "Home" });
    }
    return error;
  }
);

// * essa maneria de exportar é melhjor para teste, pq o AuthService não sabe o que estou passadno, ele só confia no que pode ser, fetch, axios, ou qualquer outra coisa
export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
};
