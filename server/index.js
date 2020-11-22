const express = require('express');
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
  origin:"http://localhost",
  credentials:true
}));
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
