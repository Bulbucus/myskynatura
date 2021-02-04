const express = require('express');
const path = require('path');
require('dotenv').config()
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const morgan = require('morgan');

// import routers
const user = require('./router/user');
const confirmUser = require('./router/confirmUser');
const perguntas = require('./router/perguntas');

const app = express();

app.use(morgan('dev'))

// default handlers
app.use(cors({
  methods:'POST,PUT',
  origin:['http://95.93.159.118','http://localhost'],
  credentials:true
}));
app.use(urlencoded({extended:true}))
app.use(json())

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

// perguntas route
app.use('/perguntas', perguntas)

// user route
app.use('/user',user);

app.use('/confirmUser', confirmUser);

app.use('/',(req,res) => {
  res.sendFile(path.join(__dirname,'views','index.html'));
})

// error page handler
app.use((req, res) => {
  res.status(404);
  res.send({message: 'Nothing to see were'})
});

// server listen handler
app.listen(8888, () => {
  console.log('Server is up');
});
