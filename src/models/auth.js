const jwt = require("jsonwebtoken");


const auth = async(req,res,next)=>{
   try{
       const token = req.cookies.jwt;
    const verifyToken = jwt.verify(token, "asjfnjsjdjshagdhgkdhabthrkelvyw");
    console.log(verifyToken);
    next();
   }
   catch(err){
       console.log(` the auth error is ------- ${err}`);
   }
    
}
module.exports = auth;