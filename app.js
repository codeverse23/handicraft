import express from "express";
import dotenv from "dotenv";
dotenv.config()
const app =express();
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`)
});

app.get("/",(req,res)=>{
    res.send(`Welcome to hendicraft`)
});
