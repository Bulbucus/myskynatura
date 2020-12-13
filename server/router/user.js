const express = require('express');
const router = express.Router();

const InputCheck = require('../util/userInputChecker')
const userController = require('../controllers/users-controllers');
const questionarioController = require('../controllers/questionario-controllers');

router.get('/', (req,res) => {
    res.json({
        message:'user route'
    })
})

// questionario controller
router.post('/resultados', InputCheck.getUserInfo, questionarioController.resultQuestionario);

// user controller
router.post('/registar',InputCheck.signUpUser ,userController.singUpUser);

router.post('/login',InputCheck.loginUser, userController.loginUser);

router.post('/getUser', InputCheck.getUserInfo, userController.getUserInfo);

router.post('/updateUser', InputCheck.updateUser, userController.updateUser)

module.exports = router;