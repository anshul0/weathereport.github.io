const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/weatherUsersData")
.then(()=>{
    console.log("database is connected..");
})
.catch((err)=>{
    console.log(`the error is ${err}`);
})