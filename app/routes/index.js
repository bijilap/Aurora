var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Aurora' });
});
router.get('/question1', function(req, res) {
  res.render('question1', { title: 'Aurora' });
});
router.get('/privacy_policy', function(req, res) {
  res.render('privacy_policy', { title: 'Aurora' });
});


module.exports = router;
