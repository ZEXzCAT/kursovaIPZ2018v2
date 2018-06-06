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
  if (req.cookies.status != '') {
    res.render('servicesLGND', {
      user: req.cookies.username
    });
  } else {
    res.render('services');
  }
});

module.exports = router;
