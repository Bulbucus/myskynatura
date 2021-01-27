const express = require('express');
const path = require('path');
require('dotenv').config()
const cors = require('cors');
const helmet = require('helmet');
const { urlencoded, json } = require('body-parser');

// import routers
const user = require('./router/user');
const confirmUser = require('./router/confirmUser');
const perguntas = require('./router/perguntas');

const app = express();

app.use(helmet());

// default handlers
app.use(cors({
  methods:'POST,PUT',
  origin:['http://95.93.159.118','http://localhost'],
  credentials:true
}));
app.use(urlencoded({extended:true}))
app.use(json())

app.use(express.static(path.join(__dirname,'build')))

// perguntas route
app.use('/perguntas', perguntas)

// user route
app.use('/user',user);

app.use('/confirmUser', confirmUser);

// error page handler
app.use((req, res) => {
  res.status(404);
  res.send({message: 'Nothing to see were'})
});

// server listen handler
app.listen(8888, () => {
  console.log('Server is up');
});
