
var jwt = require("jsonwebtoken");

const auth=async(req,res,next)=>{
const token=req.headers.authorization
// console.log(token)
// console.log("token",token.split(" ")[1])
if(token){
try{
jwt.verify(token.split(" ")[1], "practice", async (err, decoded)=> {
if(decoded){
    req.body.email=decoded.userEmail
    req.body.userId=decoded.userId
    next()
}else{
    res.status(400).json({msg:"Token Expired/Login again",status:false})
}
});

}catch(err){
    res.status(500).json({msg:"Internal Error is going on..",status:false})
}



}else{
    res.status(400).json({msg:"Please login first"})
}
}
module.exports={auth}