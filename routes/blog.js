const {mongoose}  = require("mongoose")
const express = require("express");
const Blog = require("../models/blog");
const path=require("path")
const router = express.Router();
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads/') )
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()} - ${file.originalname}`
      cb(null,fileName)
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/addBlog", (req,res) => {
    res.render("addBlog" , {
        user: req.user
    })
})

router.post("/" ,upload.single("coverImage") ,async (req,res) =>{
    const {title,body} = req.body
    const blog =await Blog.create({
        title,
        body,
        createdAt: req.user._id ,
        coverImageUrl : `uploads/${req.file.filename}`
    })
    return res.redirect(`blog/${blog._id}`)
})

module.exports = router ;