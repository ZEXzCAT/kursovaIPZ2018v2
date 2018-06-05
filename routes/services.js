var express = require('express');
var router = express.Router();

router.get('/serviceslist', function(req, res) {
    var db = req.db;
    var collection = db.get('services');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* GET page. */
router.get('/', function(req, res) {
  if (req.cookies.status == 'admin') {
    res.render('servicesA', {
      user: req.cookies.username
    });
  }
  else if (req.cookies.status == 'user') {
    res.render('servicesU', {
      user: req.cookies.username
    });
  }
  else if (req.cookies.status == 'worker') {
    res.render('servicesW', {
      user: req.cookies.username
    });
  } else {
    res.render('services');
  }
});

module.exports = router;
