const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const admin = {
  user: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASSWORD
}

app.get('/', (req,res) => {
  res.cookie('password', '',{httpOnly:true, path:'/admin', exprirex:0})
  res.cookie('user', '',{httpOnly:true, path:'/admin', exprirex:0})

  res.render('admin/login');
})

app.post('/', (req, res) => {
  const {body} = req
  if(body.user === admin.user && body.password === admin.password){
    const hash = bcrypt.hashSync(body.password, 4);
    
    res.cookie('password', hash,{httpOnly:true, path:'/admin'})
    res.cookie('user', admin.user,{httpOnly:true, path:'/admin'})
    
    return res.redirect('/admin')
  }
  res.redirect('api/login')
})

module.exports = app
