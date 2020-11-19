const signUpUserQuery = (body, palavrapasse) => {
    const arrayBody = Object.values(body)
    arrayBody.splice(5,1,palavrapasse)

    return {
    text: 'INSERT INTO users (primeiro_nome, ultimo_nome, idade ,genero ,email, palavrapasse) VALUES ($1, $2, $3, $4, $5 ,$6) RETURNING *',
    values: arrayBody
    }
}

const verifyEmail = (email) => {
    return {
        text: 'SELECT email from users where email=$1',
        values: [email]
    }
}

const verifyPassword = (email) => {
    return {
        text:'SELECT id_users, palavrapasse from users where email=$1',
        values: [email]
    }
}

const loginUserQuery = () => {

}

exports.signUpUserQuery = signUpUserQuery;
exports.verifyEmail = verifyEmail;
exports.loginUserQuery = loginUserQuery;
exports.verifyPassword = verifyPassword;