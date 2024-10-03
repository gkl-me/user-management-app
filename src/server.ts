import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

//mongodb connect
import connectDB from './config/db';
connectDB()


const app = express()
const port = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send('Hello word')
})

app.listen(port,()=>{
    console.log(`Server listening in http://localhost:${port}`)
})