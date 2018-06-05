var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.cookies.status == "user") {
    res.render('bid', {
      title: 'Express'
    });
  } else if (req.cookies.status == "admin") {
    res.render('index', {
      title: 'Express'
    });
  }
});

module.exports = router;
