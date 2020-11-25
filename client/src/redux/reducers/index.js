const reducers = (state,action) => {
    switch (action.type) {
        case "TOOGLE_LOGIN_MODEL":
            return {
                ...state,
                login: {
                    ...state.login,
                    showLoginModel: !state.login.showLoginModel,
                    preMessageLogin: action.text || ""
                }
            }
        default:
            return state;
    }
}

export default reducers;