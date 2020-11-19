const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const app = express();

// import routers
const user = require('./router/user');

// default handlers
app.use(cors());
app.use(urlencoded({extended:true}))
app.use(json())

// user route
app.use('/user',user);


// error page handler
app.use((req, res) => {
  res.status(404);
  res.send({message: 'Nothing to see were'})
});

// server listen handler
app.listen(8888, () => {
  console.log('Server is up');
});
