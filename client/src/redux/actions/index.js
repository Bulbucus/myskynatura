const actions = {
    toogleLoginModel: (boolean ,text) => {
        // coloca o query para / ou para /?=login
        return {
            type:"TOOGLE_LOGIN_MODEL",
            boolean: boolean,
            text: text
        }
    },
    userInfo: (id, email, token) => {
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