const reducers = (state,action) => {
    switch (action.type) {
        case "TOOGLE_LOGIN_MODEL":
            return {
                ...state,
                login: {
                    ...state.login,
                    showLoginModel: action.boolean,
                    preMessageLogin: action.text || ""
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
            const name = action.name
            return {
                ...state,
                questionario: {
                    ...state.questionario,
                    [name] : action.value
                }
            }
        }
        default:
            return state;
    }
}

export default reducers;