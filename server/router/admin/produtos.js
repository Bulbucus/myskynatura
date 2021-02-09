const express = require('express');
const router = express.Router();

const {getProdutos, makeProduto, getProduto, editProduto, deleteProduto, deleteResposta} = require('../../controllers/admin/produtos-crud');

router.get('/', getProdutos);

router.post('/', makeProduto);

router.delete('/', deleteProduto);

router.get('/edit/:id', getProduto);

router.post('/edit/:id', editProduto);

router.delete('/edit/:id', deleteResposta)

module.exports = router;