//posts.js

var express = require("express");
var router = express.Router();
var Post  = require("../models/posts");
var fs = require('fs');
var multer = require("multer");

var upload = multer({dest: 'uploads/'});

//index
router.get("/", function(req, res){
  Post.find({})
  .populate("author")
  .sort("-createdAt")
  .exec(function(err,posts){
    if(err) return res.json(err);
    res.render("posts/index",{posts:posts});
  });
});

//create
router.post("/", function(req, res){
  req.body.author = req.user._id
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

// Show
router.get("/:id", function(req, res){
 Post.findOne({_id:req.params.id})
 .populate("author")
 .exec(function(err, post){
  if(err) return res.json(err);
  console.log(post);
  res.render("posts/show", {post:post});
 });
});

// db.people.update( {_id:ObjectId("5b45ba2e10b063e0906b55da")}, {$set:{age:30}})
// db.posts.update({_id:ObjectId("5b45abc210ebe169468b4eb5")}, {$push:{contract:{ num:2, contractor:"A", filehash:"AA",retryCount:1,isSigned:false,comment:"none"}}})

//db.posts.find( { "contract": { $elemMatch: { "num": 2 } } } )
//db.posts.update({$and:[{_id:ObjectId("5b45abc210ebe169468b4eb5")},{"contract.num":3}]},{$set:{"contract.num":4}})
//db.posts.find( { "contract":{ $elemMatch:{"num":1} } }, {"contract":{$elemMatch:{"num":1}}}).pretty()
//db.posts.update({_id: ObjectId("5b448b66987a156147260f9f"),"contract.num":2}, {$set:{"contract.$.num":4}})


router.post("/upload/:id", upload.single('uploadFile'), function(req, res){
  console.log(req.params.id);
  Post.update({_id:req.params.id},{$push:{contract:{num:2,contractor:'CCC'}}},function(err, post){
    console.log(post);
    res.redirect("/posts/"+req.params.id);
  });
});

function checkToBoolean(obj){
  if(obj){
    return true;
  }  else{
    return false;
  }
}

module.exports = router;
