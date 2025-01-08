const { mongoose, Schema, model } = require("mongoose");

const blogSchema = new Schema ({
   title :{
     type : String,
     required : true ,
   },
   body :{
    type : String,
    required : true ,
   },
   coverImageUrl:{
    type : String,
    required : false,
   },
   createdAt :{
     type : Schema.Types.ObjectId ,
     ref : "user"
   },
},{timestamps: true})

const Blog = model("blog" , blogSchema)

module.exports= Blog ;