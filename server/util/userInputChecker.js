const {body} = require('express-validator');

const InputChecker = {
    signUpUser : [
        body('primeiro_nome').notEmpty().isAlphanumeric('pt-PT').escape(),
        body('ultimo_nome').notEmpty().isAlphanumeric('pt-PT').escape(),
        body('idade').notEmpty().isDate(),
        body('email').notEmpty().isEmail().escape(),
        body('palavrapasse').notEmpty().isLength({min: 6}).escape(),
    ],
    loginUser: [
        body('email').notEmpty().isEmail().escape(),
        body('palavrapasse').notEmpty().escape(),
    ]
}

module.exports = InputChecker;