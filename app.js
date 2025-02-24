require('dotenv').config()
const express = require("express")
const path = require("path")
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { default: mongoose } = require("mongoose");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");


const app = express();

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then(() => console.log("connection started"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))
app.use('/blog/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.set("view engine", "ejs")
app.set("views" , path.resolve("./views"));
mongoose.set('strictPopulate', false);


app.use("/user" , userRoute)

app.use("/blog" , blogRoute)


app.get("/" , async (req,res) => {
    const allBlogs = await Blog.find({})
    res.render("home" , {
        user : req.user ,
        blogs : allBlogs ,
    }) 
   
})

app.listen(PORT , ()=> console.log("server started" , PORT))