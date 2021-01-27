const express = require('express');
const router = express.Router();

const perguntasController = require('../controllers/perguntas-controllers.js')

router.get('/', perguntasController.getPerguntas)

module.exports = router;