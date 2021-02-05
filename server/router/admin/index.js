const express = require('express');
const app = express();

const produtos = require('./produtos');
const perguntas = require('./perguntas');

app.use('/produtos', produtos);

app.use('/perguntas', perguntas);

module.exports = app