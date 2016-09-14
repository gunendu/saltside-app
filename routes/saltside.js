var express = require('express');
var multer = require('multer');
var config = require('saltside_config').core;

var router = express.Router();

var UserController = require('saltside-core').Controllers.UserController;

router.get('/birds/:id', function(req,res,next) {
  var userid = req.param("userid");
  console.log("userid is",userid);
  UserController.getUserUpvotedPost(userid)
    .then(function(response) {
       return res.status(200).send({
         "ok": true,
         "result": response
       });
    })
});

router.post('/birds', function(req,res,next) {
  console.log("vote post is called");
  var post_id = req.param("post_id");
  var user_id = req.param("user_id");
  UserController.votePosts(user_id,post_id)
    .then(function(response) {
      return res.status(200).send({
        "status": "success",
        "result": response
      })
    })
    .catch(function(e) {
       console.log("vote posts error",e.stack);
    })
});

router.get('/birds', function(req,res,next) {
  console.log("down vote is called");
  var post_id = req.param("post_id");
  var user_id = req.param("user_id");
  UserController.downvote(user_id,post_id)
    .then(function(response) {
      return res.status(200).send({
        "status": "success",
        "result": response
      })
    })
    .catch(function(e) {
      console.log("down vote is called");
    })
});

router.delete('/birds/:id', function(req,res,next) {
  var comment_id = req.param("comment_id");
  var user_id = req.param("user_id");
  UserController.downVote(user_id,comment_id)
    .then(function(response) {
       return res.status(200).send({
          "status": "success",
          "result": response
       })
    })
    .catch(function(e) {
      console.log("error downVoteComment comment");
    })
});

module.exports = router;
