//* Exporto o httpClient e retorno um objeto com os dados da API
/* eslint-disable */
export default httpClient => ({
  getMe: async () => {
    const response = await httpClient.get("/users/me");

    return {
      data: response.data
    };
  }
});
