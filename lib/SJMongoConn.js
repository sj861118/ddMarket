//By Sangjun

var mongoose = require("mongoose");

var mongo = {};

mongo.connect = function(url){

  mongoose.connect(url);
  var db = mongoose.connection;
  db.once("open", function(){
   console.log("db connected");
  });
  db.on("error", function(err){
   console.log("db error : ", err);
  });

}

module.exports = mongo;
