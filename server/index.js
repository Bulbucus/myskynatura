const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
var cookieParser = require('cookie-parser')
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const morgan = require('morgan');
const removeSlash = require('./removeSlash');

require('dotenv').config()

// import routers
const user = require('./router/user');
const confirmUser = require('./router/confirmUser');
const perguntas = require('./router/perguntas');
const admin = require('./router/admin/index');
const loginAdmin = require('./router/login');

const checkLoginMiddleware = require('./middleware/checkLogin');

const app = express();

// receber os requests no terminal
app.use(morgan('dev'))

// default handlers
app.use(cors({
  methods:'POST,PUT,DELETE',
  origin:['http://95.93.159.118','http://localhost'],
  credentials:true
}));

// middleware para transformar parametros do input em objetos
app.use(urlencoded({extended:true}))
app.use(json())
app.use(cookieParser())

// assim consegue receber metodos como DELETE e PUT:
app.use(methodOverride('_method'))

// diz ao express onde procurar por ficheiros
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

// remove o / no fim da url, para evitar erros e problemas com SEO
app.use(removeSlash)

// perguntas route
app.use('/perguntas', perguntas)

// user route
app.use('/user',user);

// para confirmar users;
app.use('/confirmUser', confirmUser);

app.use('/login', loginAdmin)

// para criar , apagar e editar perguntas e produtos
app.use('/admin', checkLoginMiddleware ,admin)

// error page handler
app.use((req, res) => {
  res.status(404);
  res.send({message: 'Nothing to see were'})
});

// server listen handler
app.listen(8888, () => {
  console.log('Server is up');
});
