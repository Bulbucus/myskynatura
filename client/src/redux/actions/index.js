const actions = {
    toogleLoginModel: (urlLogin, text) => {
        // coloca o query para / ou para /?=login
        window.history.replaceState({},'', urlLogin)
        return {
            type:"TOOGLE_LOGIN_MODEL",
            text: text
        }
    },
}

export default actions;