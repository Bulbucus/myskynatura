const express = require('express');
const path = require('path');
require('dotenv').config()
const cors = require('cors');
const helmet = require("helmet");
const { urlencoded, json } = require('body-parser');

// import routers
const user = require('./router/user');

const app = express();

app.use(helmet());

// default handlers
app.use(cors({
  methods:"POST,PUT",
  origin:"http://localhost:8888",
  credentials:true
}));
app.use(urlencoded({extended:true}))
app.use(json())

app.use(express.static(path.join(__dirname,'build')))

// user route
app.use('/user',user);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'build','index.html'))
})

// error page handler
app.use((req, res) => {
  res.status(404);
  res.send({message: 'Nothing to see were'})
});

// server listen handler
app.listen(80, () => {
  console.log('Server is up');
});
