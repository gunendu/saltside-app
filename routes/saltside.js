var express = require('express');
var multer = require('multer');
var utils = require('./utils');

var router = express.Router();

var BirdController = require('sd-core').Controllers.BirdController;

router.post('/birds', function(req,res,next) {
  var name = req.param("name");
  var family = req.param("family");
  var continents = req.param("continents").split(",");
  var visible = req.param("visible") || false;

  var response = utils.validateParams(["name","family","continents"],req)

  if(response.length>0){
     return res.status(400).send({
        "status": 400
     })
  }

  console.log("valid",response);

  BirdController.saveBird(name,family,continents,visible)
    .then(function(response) {
      return res.status(201).send({
        "status": 201,
        "result": response
      })
    })
    .catch(function(e) {
       console.log("birds posts error",e.stack);
    })
});

router.get('/birds', function(req,res,next) {
  BirdController.getAllBirds()
    .then(function(response) {
      console.log("response",response);
      return res.status(200).send({
        "status": 200,
        "result": response
      })
    })
    .catch(function(e) {
      console.log("get all Birds is called",e.stack);
    })
});


router.get('/birds/:id', function(req,res,next) {
  var id = req.param("id");
  BirdController.getBirdById(id)
    .then(function(response) {
       return res.status(200).send({
         "status": 200,
         "result": response
       });
    })
    .catch(function(e) {
      return res.status(404).send({
         "status": 404,
         "result": {}
      })
    })
});

router.delete('/birds/:id', function(req,res,next) {
  var id = req.param("id");
  BirdController.deleteById(id)
    .then(function(response) {
       return res.status(200).send({
          "status": 200,
          "result": response
       })
    })
    .catch(function(e) {
      return res.status(404).send({
         "status": 404,
         "result": {}
      })
    })
});

module.exports = router;
