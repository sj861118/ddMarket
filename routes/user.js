var express = require("express");
var router = express.Router();
var User  = require("../models/user");

// New
router.get("/new", function(req, res){
 res.render("users/new");
});

// create
router.post("/", function(req, res){
  console.log(req.body);
 User.create(req.body, function(err, user){
  if(err){
   return res.redirect("/user/new");
  }
  res.redirect("/login");
 });
});

module.exports = router;
