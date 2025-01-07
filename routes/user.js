const {mongoose}  = require("mongoose")
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/signup" , (req,res) => {
    res.render("signup")
})

router.get("/signin" , (req,res) => {
    res.render("signin")
})

router.post("/signup" , async (req,res) => {
    const {fullName,email,password} = req.body;
    await User.create({
        fullName ,
        email,
        password ,
    })
    return res.redirect("/")
})

router.post("/signin" , async (req,res) =>{
    const {email,password} = req.body;

try {
    const token = await User.genarateAndMatchPassword(email,password)
    console.log("token" , token);

    return res.cookie("token" , token).redirect("/")
} catch (error) {
    res.render("signin" , {
        error : "incorrect email or password",
    })
    
}
})

router.get("/logout" , (req,res) => {
    res.clearCookie("token").redirect("/")
})


module.exports = router;