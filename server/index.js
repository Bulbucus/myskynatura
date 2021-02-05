const express = require('express');
const path = require('path');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const morgan = require('morgan');

require('dotenv').config()

// import routers
const user = require('./router/user');
const confirmUser = require('./router/confirmUser');
const perguntas = require('./router/perguntas');
const admin = require('./router/admin/index')

const app = express();

// receber os requests no terminal
app.use(morgan('dev'))

// default handlers
app.use(cors({
  methods:'POST,PUT',
  origin:['http://95.93.159.118','http://localhost'],
  credentials:true
}));

// middleware para transformar parametros do input em objetos
app.use(urlencoded({extended:true}))
app.use(json())

// diz ao express onde procurar por ficheiros
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

// perguntas route
app.use('/perguntas', perguntas)

// user route
app.use('/user',user);

// para confirmar users;
app.use('/confirmUser', confirmUser);

// para criar , apagar e editar perguntas e produtos
app.use('/admin', admin)

// error page handler
app.use((req, res) => {
  res.status(404);
  res.send({message: 'Nothing to see were'})
});

// server listen handler
app.listen(8888, () => {
  console.log('Server is up');
});
