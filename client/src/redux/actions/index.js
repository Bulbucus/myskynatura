const actions = {
    toogleLoginModel: (boolean, text, path) => {
        // remove sempre o query ao fechar
        !boolean && window.history.replaceState(null,null,path)

        return {
            type:"TOOGLE_LOGIN_MODEL",
            boolean: boolean,
            text: text,
            redirect: path
        }
    },
    userInfo: (id, email ,token) => {
        return {
            type:"USER_INFO",
            id: id,
            email: email,
            token: token
        }
    },
    cookiesQuestionario: (name, value) => {
        return {
            type:"GET_COOKIE_QUESTIONARIO",
            name: name,
            value: value
        }
    }
}

export default actions;