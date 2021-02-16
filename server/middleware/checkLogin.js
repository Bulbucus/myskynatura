const bcrypt = require('bcrypt');

const admin = {
  user: process.env.ADMIN_USER,
  password:process.env.ADMIN_PASSWORD
}

const checkLoginMiddleware = (req, res, next) => {
  if(req.cookies){
    if(req.cookies.user === admin.user && req.cookies.password){
      const comparePassword = bcrypt.compareSync(admin.password, req.cookies.password);
      if(comparePassword) {
        return next()
      }
    } 
  }
  res.redirect('/api/login')
}

module.exports = checkLoginMiddleware;