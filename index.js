//index.js
﻿var express = require('express');
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var session    = require("express-session"); // 1
var passport   = require("./lib/SJLocalPassport");
var app = express();

var db = require('./lib/SJMongoConn');
db.connect('mongodb://localhost:27017/ddMarket');

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({secret:"sj861118"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
 res.locals.isAuthenticated = req.isAuthenticated();
 res.locals.currentUser = req.user;
 next();
})

app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));
app.use("/user", require("./routes/user"));

app.listen(3000, function(){
 console.log('Server On!');
});
