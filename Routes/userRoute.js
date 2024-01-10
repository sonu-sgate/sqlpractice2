const express=require('express')
const { connection } = require('../connection/connection')

const userRouter=express.Router()


userRouter.post('/signup',async(req,res)=>{
const {name,email,password}=req.body

if(name,email,password){
const [data]=await connection.promise().query(`SELECT email FROM practice2 WHERE email=${email}`)
if(data){
    res.status(409).json({msg:"User is already exists"})
}else{
    try{
 await connection.promise().query("INSERT INTO practice2 (name,email,password)",[name,email,password],(err)=>{
        if(err){
            res.status(500).json({msg:"Internal Error is going on.."})
        }else{
            res.status(201).json({msg:"User Added Successfully"})
        }
    })}catch(err){
        res.status(500).json({msg:'internal error is going on ..'})
    }
}
}else{
    res.status(400).json({msg:"Please Provide the required details"})
}



})

module.exports={userRouter}