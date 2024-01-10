const sql=require("mysql2")

const express=require('express')

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "college",
});
module.exports={connection}