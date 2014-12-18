var express = require('express');
var router = express.Router();
var java = require("java");
var mysql = require('mysql');

//mysql setup
var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password : 'password',
                  database : 'AURORA' });
connection.connect();

java.classpath.push('java/commons-math3-3.3.jar');
java.classpath.push('java/guava-18.0.jar');
java.classpath.push('java/mahout-core-0.9.jar');
java.classpath.push('java/mahout-integration-0.9.jar');
java.classpath.push('java/mahout-math-0.9.jar');
java.classpath.push('java/mysql-connector-java-5.0.8-bin.jar');
java.classpath.push('java/slf4j-api-1.7.7.jar');
java.classpath.push('java/slf4j-nop-1.7.7.jar');
java.classpath.push('java/aurora_recommender.jar');

var preference_tables = ["ACTIVITY_PREFERENCE", "RESTAURANT_PREFERENCE"];

var activity_recommender = java.newInstanceSync("com.aurora.recommender.RecommendActivity");
var restaurant_recommender = java.newInstanceSync("com.aurora.recommender.RecommendRestaurant");
//var result =   activity_recommender.getRecommendationSync(10000,3);
//var result = java.callMethodSync(restaurant_recommender, "getRecommendation",10000,3);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Aurora' });
});
router.get('/addUser', function(req, res) {
  var userName = req.query.user_id;
  var personalityType = req.query.personality;
  if(personalityType.length !=4)
    res.send({error:1, message: "Invalid personality type"});
  var list1 = ['I', 'N', 'F', 'J']
  var list2 = ['E', 'S', 'T', 'P']
  for(var i=0; i<4;i++){
        if((personalityType[i]!= list1[i]) && (personalityType[i]!= list2[i]))
          res.send({error:2, message: "Invalid personality type"});
  }
  connection.query('SELECT MAX(USERID)+1 AS USER FROM USERS', function(err, rows, fields){
    if (err){
      res.send({error: 3, message: "creating new user failed"});
    }
    else{
      var userId = rows[0]['USER']
      connection.query('INSERT INTO USERS SET ?', {USERID: userId, USERNAME: userName, PERSONALITY_TYPE: personalityType }, function(err, result) {
          if (err){
            res.send({error: 3, message: "creating new user failed"});
          }
          else{
            for(var j=0; j<preference_tables.length; j++){
                for(var i=0; i<4;i++){
                    var itemid1 = (2*i+1);
                    var itemid2 = (2*i+2);
                    if(personalityType[i] == list2[i]){
                      itemid1 = (2*i+2);
                      itemid2 = (2*i+1);
                    }
                    connection.query('INSERT INTO '+preference_tables[j]+' SET ?', {USERID: userId, ITEMID: itemid1, RATING: 5 }, function(err, res) {
                      if (err){
                        res.send({error: 4, message: "insert into preference table failed"});
                      }
                      else{
                        //res.send({message: userName+" is now added to answer a user!"});
                      }
                    });
                    connection.query('INSERT INTO '+preference_tables[j]+' SET ?', {USERID: userId, ITEMID: itemid2, RATING: 1 }, function(err, res) {
                      if (err){
                        res.send({error: 4, message: "insert into preference table failed"});
                      }
                      else{
                        //res.send({message: userName+" is now added to answer a user!"});
                      }
                    });
                }
              }
              res.send({message: userName+" is now added to answer a user!"});
        }
      });
    }
  });
  return {message: "end"}
});

router.get('/:user_id/recommend/activities', function(req,res){
  var userName = req.params.user_id;
  var k =3;
  if("k" in req.query)
    k=parseInt(req.query.k);
  connection.query('SELECT USERID FROM USERS WHERE USERNAME="'+userName+'"', function(err, rows, fields){
    if (err){
      res.send({error: 5, message: "No such user!"});
    }
    else{
      var userId = parseInt(rows[0]['USERID'])
      var result =   activity_recommender.getRecommendationSync(userId,k);
      var n = result.sizeSync();
      var sql="";
      for(var i =0; i<n; i++){
        sql += "SELECT TITLE AS name FROM ACTIVITY WHERE ITEMID="+result.getSync(i).getKeySync();
        if(i<(n-1))
          sql += " UNION ";
      }
      connection.query(sql, function(err, rows, fields){
        if (err){
          res.send({error: 10, message: "No recommendations!"});
        }
        else{
          res.send({recommendations:rows});
        }
      });
    }
  });
});


router.get('/:user_id/recommend/restaurants', function(req,res){
  var userName = req.params.user_id;
  var k =3;
  if("k" in req.query)
    k=parseInt(req.query.k);
  connection.query('SELECT USERID FROM USERS WHERE USERNAME="'+userName+'"', function(err, rows, fields){
    if (err){
      res.send({error: 5, message: "No such user!"});
    }
    else{
      var userId = parseInt(rows[0]['USERID'])
      var result =   restaurant_recommender.getRecommendationSync(userId,k);
      var n = result.sizeSync();
      var sql="";
      for(var i =0; i<n; i++){
        sql += "SELECT TITLE AS name FROM RESTAURANT WHERE ITEMID="+result.getSync(i).getKeySync();
        if(i<(n-1))
          sql += " UNION ";
      }
      connection.query(sql, function(err, rows, fields){
        if (err){
          res.send({error: 10, message: "No recommendations!"});
        }
        else{
          res.send({recommendations:rows});
        }
      });
    }
  });
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
