import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config()
import connectDB from './config/connectDB.js'
import userRoute from './routes/user.route.js'

const app = express();
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'));
app.use(helmet({
    crossOriginResourcePolicy:false
}))

const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    // sever to client 
    res.json({
        message:"Server is Running"+PORT
    });
})
app.use('/api/user',userRoute);


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server Running At ",PORT);
    })
})