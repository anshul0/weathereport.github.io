const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("./db/conn");
// schema and collection path
const Weather = require("./models/signupage");
const path = require("path");
const hbs =  require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./models/auth");

//paths join
const publicPath = path.join(__dirname, "../public");
const viewpath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");


//middlewares
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//installviews
app.set("view engine","hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);

app.get("/", (req,res)=>{
    res.render("home");
})
app.get("/home", (req,res)=>{
    res.render("home");
})
app.get("/signup", (req,res)=>{
    res.render("signup");
})
app.get("/about", (req,res)=>{
    res.render("about");
})
app.get("/weather",auth , (req,res)=>{
    res.render("weather");
})
app.get("/contact", (req,res)=>{
    res.render("contact");
})
app.get("/report", (req,res)=>{
    res.render("report");
})
app.post("/login",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    const userlogin = await Weather.findOne({email : email});
    const isMatch = await bcrypt.compare(password , userlogin.password);

    const token = await userlogin.generateAuthToken();
            console.log(token);
            res.cookie("jwt",token, {
                httpOnly:true,
                expires : new Date(Date.now() + 300000)
            });

    if(isMatch){ 
        console.log("logini successfully");
        res.render("home");
    }else{
        res.send("invalid user");
    }
});
app.post("/signup", async (req,res)=>{
    try{

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const userdetails = new Weather({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword
            });

            const token = await userdetails.generateAuthToken();
            console.log(token);

            res.cookie("jwt",token, {
                httpOnly:true,
                expires : new Date(Date.now() + 300000)
            });

            const result = await userdetails.save();
            res.render("home");
        }else{
            res.status(404).send("feild required");
        }

    }
    catch(err){
        console.log(err);
    }
})

app.listen(port , ()=>{
    console.log("server stats..");
})