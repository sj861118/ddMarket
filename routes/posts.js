//posts.js

var express = require("express");
var router = express.Router();
var Post  = require("../models/posts");

function checkToBoolean(obj){
  if(obj){
    return true;
  }  else{
    return false;
  }
}

//index
router.get("/", function(req, res){
  Post.find({})
  .sort("-createdAt")
  .exec(function(err,posts){
    console.log(posts);
    if(err) return res.json(err);
    res.render("posts/index",{posts:posts});
  });
});

//create
router.post("/", function(req, res){
  req.body.resaleUse = checkToBoolean(req.body.resaleUse);
  req.body.commercialUse = checkToBoolean(req.body.commercialUse);
  Post.create(req.body, function(err, post){
    if(err){
      return res.redirect("/posts/new");
    }
    res.redirect("/posts");
  })
});

router.get("/new",function(req, res){
  res.render("posts/new");
});
module.exports = router;
