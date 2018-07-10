//posts.js

var express = require("express");
var router = express.Router();
var Post  = require("../models/posts");

//index
router.get("/", function(req, res){
 res.render("posts/index");
});

//create
router.post("/", function(req, res){
  Post.create(req.body, function(err, post){
    if(err){
      console.log(req.body.title);
      return res.redirect("/posts/new");
    }
    res.redirect("/posts");
  })
});

router.get("/new",function(req, res){
  res.render("posts/new");
});
module.exports = router;
