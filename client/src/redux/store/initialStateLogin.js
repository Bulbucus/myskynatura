const URLloginHandler = () => {
  const params = new URL(window.location).searchParams;

  switch (params.get("emailConfirmed")) {
    case "true":
      return {
        showLoginModel: true,
        preMessageLogin: "Email verificado com sucesso por favor faça o login",
        path: "/",
      };

    case "false":
      return {
        showLoginModel: true,
        preMessageLogin: "Erro na verificação de email, por favor verifique a caixa de correio no seu email",
        path: "/",
      };
    default:
      return {
        showLoginModel: false,
        preMessageLogin: "",
        path: "/",
      };
  }
};

export default URLloginHandler;
