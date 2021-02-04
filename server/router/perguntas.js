const express = require('express');
const router = express.Router();

const perguntasController = require('../controllers/perguntas-controllers.js')

router.get('/', perguntasController.getPerguntas)

router.get('/createproduts', (req, res) => {

  res.render('createproduts');
})

router.post('/createproduts', (req, res) => {
  console.log(req.body)
  res.redirect('createproduts')
})


module.exports = router;