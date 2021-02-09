const express = require('express');
const app = express();

const produtos = require('./produtos');
const perguntas = require('./perguntas');

app.use('/produtos', produtos);

app.use('/perguntas', perguntas);

app.get('/', (req, res) => {
  res.render('admin/index')
})


module.exports = app