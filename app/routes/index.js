var express = require('express');
var router = express.Router();
var java = require("java");

java.classpath.push('java/commons-math3-3.3.jar');
java.classpath.push('java/guava-18.0.jar');
java.classpath.push('java/mahout-core-0.9.jar');
java.classpath.push('java/mahout-integration-0.9.jar');
java.classpath.push('java/mahout-math-0.9.jar');
java.classpath.push('java/mysql-connector-java-5.0.8-bin.jar');
java.classpath.push('java/slf4j-api-1.7.7.jar');
java.classpath.push('java/slf4j-nop-1.7.7.jar');
java.classpath.push('java/aurora_recommender.jar');

var activity_recommender = java.newInstanceSync("com.aurora.recommender.RecommendActivity");
var result = java.callMethodSync(activity_recommender, "getRecommendation",10000,3);
console.log(result);
var restaurant_recommender = java.newInstanceSync("com.aurora.recommender.RecommendRestaurant");
var result = java.callMethodSync(restaurant_recommender, "getRecommendation",10000,3);
console.log(result);

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
