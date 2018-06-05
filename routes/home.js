var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.cookies.status == 'admin') {
    res.render('homeA', {
      user: req.cookies.username
    });
  } else if (req.cookies.status == 'user') {
    res.render('homeU', {
      user: req.cookies.username
    });
  } else if (req.cookies.status == 'worker') {
    res.render('homeW', {
      user: req.cookies.username
    });
  } else {
    res.render('home');
  }
});

module.exports = router;
