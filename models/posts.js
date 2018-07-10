// models/Post.js
var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
  title:{type:String, required:true},
  currentCount:{type:Number, default:0},
//   author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
  createdAt:{type:Date, default:Date.now},
  limitCount:{type:Number, required:true, default:10, min:1},
  dataType:{type:String, required:true},
//   price:{type:Number,required:true, default:0, min:0},
//   dataFormat:{type:String, required:true}
//   commercialUse:{type:Boolean}
//   resaleUse:{type:Boolean},
//   contents:{type:String},
//   contract:[
//     {
//       num:{type:Number},
//       filehash:{type:String},
//       retryCount:{type:Number, default:0},
//       isSigned:{type:Boolean},
//       comment:{type:String}
//     }
//   ]
// },{
//   toObject:{virtuals:true}
});

var Post = mongoose.model("posts", postSchema);
module.exports = Post;
