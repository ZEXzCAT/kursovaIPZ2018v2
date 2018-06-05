var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.cookie('username', 'obj.username');
  res.render('login');
});

module.exports = router;
