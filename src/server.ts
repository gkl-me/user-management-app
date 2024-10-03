import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import userRouter from './routes/userRoutes'

//mongodb connect
import connectDB from './config/db';
connectDB()


const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/api/users',userRouter)

app.get('/',(req,res) => {
    res.send('Hello word')
})

app.listen(port,()=>{
    console.log(`Server listening in http://localhost:${port}`)
})