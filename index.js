const express = require("express")
const path = require("path")
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { default: mongoose } = require("mongoose");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");


const app = express();

const PORT = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => console.log("connection started"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))

app.set("view engine", "ejs")
app.set("views" , path.resolve("./views"));


app.use("/user" , userRouter)

app.use("/blog" , blogRouter)


app.get("/" , async (req,res) => {
    const allBlogs = await Blog.find({})
    res.render("home" , {
        user : req.user ,
        blogs : allBlogs ,
    }) 
   
})

app.listen(PORT , ()=> console.log("server started"))