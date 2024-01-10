const express=require("express")
const cors=require('cors')
const { connection } = require("./connection/connection")
const app=express()

app.use(cors())
app.use(express.json())

app.get('/',async(req,res)=>{
    res.status(200).json({msg:"welcome to practice session "})
})

app.listen(5000,async(req,res)=>{
try{
    connection.connect((err)=>{
        if(err){
            console.log("Not able to connect")
        }
        console.log("connected to mysql database")
    })

}catch{
    console.log('Internal error is going on')
}
console.log("server is running on port 5000")
})
