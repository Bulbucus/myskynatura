var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const json = {
    Name: "Emanuel",
    SubName: "Farinha"
  }

  res.json(json);
});

module.exports = router;
