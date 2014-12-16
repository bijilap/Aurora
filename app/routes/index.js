var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Aurora' });
});
router.get('/question1', function(req, res) {
  res.render('16_survey.jade', { title: 'Aurora' });
});
router.get('/submit_q1', function(req,res) {
    var code = req.query.code;
    console.log(code);
    res.redirect('/question2');
});
router.get('/question2', function(req, res) {
  res.render('hangout.jade', { title: 'Aurora' });
});
router.get('/privacy_policy', function(req, res) {
  res.render('privacy_policy', { title: 'Aurora' });
});


module.exports = router;
