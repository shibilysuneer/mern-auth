import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.log('mongodb connection error',err);
})

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log('server listening on port 3000');  
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode ||500;
    const message  = err.message || 'internal server error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})