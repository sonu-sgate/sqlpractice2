const express=require('express')
const { connection } = require('../connection/connection')

const accessRouter=express.Router()

accessRouter.get("/getdetails",async(req,res)=>{
    const {email}=req.body
    const query=`SELECT name,email`
    const [data]=await connection.promise().query("SELECT email,")
})
accessRouter.post('/adddetails',async(req,res)=>{
const {mob}=req.body
const {userId}=req.body
console.log(mob,userId)

const [data]=await connection.promise().query(`SELECT userId FROM practice2posts WHERE userId='${userId}'`)

if(data.length>0){
    res.status(400).json({msg:"Data is Already Present You can edit it"})
}else{
    if (mob) {
      const query = `INSERT INTO practice2posts (mob,userId) VALUES ('${mob}','${userId}')`;
     connection.query(query, (err) => {
        if (err) {
          res.status(500).json({ msg: "Internal error is going on .." });
        } else {
          res.status(200).json({ msg: "Post Created Successfully" });
        }
      });
    } else {
      res.status(400).json({ msg: "Please provide the required details" });
    }
}





})
module.exports={accessRouter}