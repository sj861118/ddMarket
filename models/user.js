// models/User.js

var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// schema // 1
var userSchema = mongoose.Schema({
 username:{
  type:String,
  required:[true,"Username is required!"],
  match:[/^.{4,12}$/,"Should be 4-12 characters!"],
  trim:true,
  unique:true
 },
 password:{
  type:String,
  required:[true,"Password is required!"],
  select:false
 },
 name:{
  type:String,
  required:[true,"Name is required!"],
  match:[/^.{4,12}$/,"Should be 4-12 characters!"],
  trim:true
 },
 email:{
  type:String,
  match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,"Should be a vaild email address!"],
  trim:true
 }
},{
 toObject:{virtuals:true}
});

userSchema.methods.authenticate = function (password) {
 var user = this;
 return (user.password == password);
};

// model & export
var User = mongoose.model("user",userSchema);
module.exports = User;
