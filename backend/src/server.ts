import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import userRouter from './routes/userRoutes'
import adminRouter from './routes/adminRoutes'
import cookieParser from 'cookie-parser';

//mongodb connect
import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
connectDB()

import cors  from 'cors'

const port = process.env.PORT || 3000
const app = express()
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//routes
app.use('/api/users',userRouter)
app.use('/api/admin',adminRouter)

//middlwares
app.use(notFound)
app.use(errorHandler)

app.get('/',(req,res) => {
    res.send('Hello word')
})

app.listen(port,()=>{
    console.log(`Server listening in http://localhost:${port}`)
})