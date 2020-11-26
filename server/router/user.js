const express = require('express');
const router = express.Router();

const InputCheck = require('../util/userInputChecker')
const userController = require('../controllers/users-controllers');

router.get('/', (req,res) => {
    res.json({
        message:'user route'
    })
})

router.post('/registar',InputCheck.signUpUser ,userController.singUpUser);

router.post('/login',InputCheck.loginUser, userController.loginUser);

router.post('/getUser', InputCheck.getUserInfo, userController.getUserInfo)

module.exports = router;