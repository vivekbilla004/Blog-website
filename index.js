const express = require("express")
const path = require("path")
const userRouter = require("./routes/user");
const { default: mongoose } = require("mongoose");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => console.log("connection started"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs")
app.set("views" , path.resolve("./views"));


app.use("/user" , userRouter)


app.get("/" , (req,res) => {
    res.render("home" , {
        user : req.user
    }) 
   
})

app.listen(PORT , ()=> console.log("server started"))