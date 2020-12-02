const express = require('express');
const path = require('path');
require('dotenv').config()
const cors = require('cors');
const helmet = require("helmet");
const { urlencoded, json } = require('body-parser');

// import routers
const user = require('./router/user');
const confirmUser = require('./router/confirmUser')

const app = express();


// default handlers
app.use(cors({
  methods:"POST,PUT",
  origin:["http://95.93.159.118:4000", "http://localhost:4000","http://192.168.1.6:4000"],
  credentials:true
}));
app.use(urlencoded({extended:true}))
app.use(json())

app.use(express.static(path.join(__dirname,'build')))

// user route
app.use('/user',user);

app.use('/confirmUser', confirmUser);

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
