const express = require('express');
const router = express.Router();

const {getPerguntas, makePerguntas, deletePerguntas, getPergunta, editPergunta, deleteResposta} = require('../../controllers/admin/perguntas-crud');

router.get('/', getPerguntas);

router.post('/', makePerguntas);

router.delete('/', deletePerguntas);

router.get('/edit/:id', getPergunta);

router.post('/edit/:id', editPergunta);

router.delete('/edit/:id', deleteResposta)

module.exports = router;