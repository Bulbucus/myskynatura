const reducers = (state,action) => {
    switch (action.type) {
        case "TOOGLE_LOGIN_MODEL":
            return {
                ...state,
                login: {
                    ...state.login,
                    showLoginModel: action.boolean,
                    preMessageLogin: action.text || "",
                    path: action.redirect || "/"
                }
            }
        case "USER_INFO":
            return {
                ...state,
                user: {
                    id: action.id,
                    email: action.email,
                    token: action.token
                }
            }
        case "GET_COOKIE_QUESTIONARIO": {
            //para evitar erros tais como ao refazer o teste nao criar mais respostas:
            state.questionario[action.id] = action.value;

            return {
                ...state,
                questionario: [
                    ...state.questionario,
                ]
            }
        }
        default:
            return state;
    }
}

export default reducers;