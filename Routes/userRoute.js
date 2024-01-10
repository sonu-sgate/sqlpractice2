const express=require('express')
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { connection } = require('../connection/connection')

const userRouter=express.Router()


userRouter.post('/signup',async(req,res)=>{
const {name,email,password}=req.body

if(name,email,password){
const [data]=await connection.promise().query(`SELECT email FROM practice2 WHERE email='${email}'`)
// console.log(data,"data")
// console.log('name','email','password',name,email,password)
if(data.length>0){
    res.status(409).json({msg:"User is already exists"})
}else{
   
    await connection.promise().beginTransaction()
    try{
 bcrypt.hash(password, 5, async (err, hash)=> {
if(hash){
 connection.query(
   "INSERT INTO practice2 (name,email,password) VALUES (?,?,?)",
   [name, email, hash],
   (err) => {
     if (err) {
       console.log(err);
       res.status(500).json({ msg: "Internal Error is going on.." });
     } else {
       res.status(201).json({ msg: "User Added Successfully" });
     }
   }
 );
}else{
    res.status(500).json({msg:"Internal Error is going on.."})
}
 });




 


}catch(err){
        console.log(err)
        res.status(500).json({msg:'internal error is going on ..'})
    }

}
}else{
    res.status(400).json({msg:"Please Provide the required details"})
}



})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body

if(email,password){
try{
    const query=`SELECT * FROM practice2 WHERE email='${email}'`
const [data]=await connection.promise().query(query)
console.log(data[0],'logged userdata')
if(data.length>0){
    console.log(data[0])
    const token = jwt.sign({ userId:data[0].id,userEmail:data[0].email }, "practice");
    bcrypt.compare(password, data[0].password, async (err, result)=> {
        console.log(result,"result")
    if(result){
res.status(200).json({ msg: "login succesfully", status: true, userdata: data[0], token });
    }else{
        res.status(400).json({msg:"Wrong password..!!"})
    }
    });

}else{
    res.status(404).json({msg:"Not a Registered User"})
}
}catch(err){
    res.status(500).json({status:false,msg:"Internal error is going on "})
}
}else{
    res.status(400).json({status:false,msg:"please provide the required details"})
}



})

module.exports={userRouter}