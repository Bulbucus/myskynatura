const signUpUserQuery = (body, palavrapasse) => {
    const arrayBody = Object.values(body)
    arrayBody.splice(5,1,palavrapasse)
    // remove as respostas do questionario:
    arrayBody.pop()

    return {
    text: 'INSERT INTO users (primeiro_nome, ultimo_nome, genero, idade ,email, palavrapasse) VALUES ($1, $2, $3, $4, $5 ,$6) RETURNING *',
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
        text:'SELECT id_utilizador, palavrapasse, email_confirmed from users where email=$1',
        values: [email]
    }
}

const getUserInfoQuery = (id) => {
    return{
        text:'select primeiro_nome, ultimo_nome, idade, genero from users where id_utilizador=$1',
        values:[id]
    }
}

const updateUserQuery = (body) => {
    body.idade = new Date(body.idade).toISOString();
    const arrayBody = Object.values(body);
    
    return {
        text: 'update users set primeiro_nome=$2, ultimo_nome=$3, idade=$4, genero=$5 where id_utilizador=$1',
        values: arrayBody
    }
}

const confirmUser = (id) => {
    return {
        text: 'update users set email_confirmed=true where id_utilizador=$1',
        values: [id]
    }
}

exports.signUpUserQuery = signUpUserQuery;
exports.verifyEmail = verifyEmail;
exports.verifyPassword = verifyPassword;
exports.getUserInfoQuery = getUserInfoQuery;
exports.updateUserQuery = updateUserQuery;
exports.confirmUser = confirmUser;