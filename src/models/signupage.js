const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const myschema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
             type:String,
             require:true
        }
    }]
})

    myschema.methods.generateAuthToken = async function(){
        const token = await jwt.sign({_id : this._id}, "asjfnjsjdjshagdhgkdhabthrkelvyw");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }

     myschema.pre("save",async function(){
    if(this.isModified("password")){
     this.password = await bcrypt.hash((this.password), 10);
     this .confirmpassword = await bcrypt.hash((this.confirmpassword), 10);
    }
    })



const WeatherUser = new mongoose.model("WeatherUser", myschema);

module.exports  = WeatherUser;