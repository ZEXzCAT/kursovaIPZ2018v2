var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.cookies.status != '') {
    res.render('homeLGND', {
      user: req.cookies.username
    });
  } else {
    res.render('home');
  }
});

module.exports = router;
