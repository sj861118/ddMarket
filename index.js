//index.js
﻿var express = require('express');
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var app = express();

var db = require('./lib/SJMongoConn');
db.connect('mongodb://localhost:27017/ddMarket');

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));

app.listen(3000, function(){
 console.log('Server On!');
});
