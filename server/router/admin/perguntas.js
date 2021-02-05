const express = require('express');
const router = express.Router();

const {getPerguntas, makePerguntas, deletePerguntas, getPergunta, editPergunta} = require('../../controllers/admin/perguntas-crud');

router.get('/', getPerguntas);

router.post('/add', makePerguntas);

router.post('/delete', deletePerguntas);

router.get('/edit/:id', getPergunta);

router.post('/edit/:id', editPergunta)

module.exports = router;