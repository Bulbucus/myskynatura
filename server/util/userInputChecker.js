const {body} = require('express-validator');

const InputChecker = {
    signUpUser : [
        body('primeiro_nome').notEmpty().escape(),
        body('ultimo_nome').notEmpty().escape(),
        body('idade').notEmpty().isDate(),
        body('email').notEmpty().isEmail().escape(),
        body('palavrapasse').notEmpty().isLength({min: 6}).escape(),
        body('genero').custom(value => {
            if(value !== 'F' || value !== 'M') {
                return true;
            }
            throw new Error('Genero não definido')
        })
    ],
    loginUser: [
        body('email').notEmpty().isEmail().escape(),
        body('palavrapasse').notEmpty().escape(),
    ],
    getUserInfo: [
        body('id').notEmpty(),
        body('token').notEmpty()
    ],
    updateUser : [
        body('id').notEmpty(),
        body('primeiro_nome').notEmpty().escape(),
        body('ultimo_nome').notEmpty().escape(),
        body('idade').notEmpty().isDate(),
        body('genero').custom(value => {
            if(value !== "F" && value !== "M") {
                throw new Error('Genero não definido')
            }
            return true;
        })
    ],
}

module.exports = InputChecker;