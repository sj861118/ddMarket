var express = require("express");
var router = express.Router();
var passport= require("../lib/SJLocalPassport.js"); // 1
// Home
router.get("/", function(req, res){
 res.render("home/welcome");
});

router.post("/login",
 function(req,res,next){
  var errors = {};
  var isValid = true;
  if(!req.body.username){
   isValid = false;
  }
  if(!req.body.password){
   isValid = false;
  }

  if(isValid){
   next();
  } else {
   res.redirect("/login");
  }
 },
 passport.authenticate("local-login", {
  successRedirect : "/",
  failureRedirect : "/login"
 }
));

router.get("/login", function(req, res){
  res.render("home/login");
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
