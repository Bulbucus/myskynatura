const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/produtos');
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.redirect('/admin/produtos')
})

module.exports = router;