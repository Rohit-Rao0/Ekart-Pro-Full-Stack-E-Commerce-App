import express from 'express';
import 'dotenv/config' ;
import mongoose from 'mongoose';
import { connectDB }from './database/db.js';
import userRouter from './routes/userRoute.js';
import cors from 'cors';

const app=express();


app.use(cors({
  origin: 'http://localhost:5173', //  frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent with requests
}));
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.get("/test", (req, res) => {
  res.json({ message: "Server is working" });
});
app.use("/api/v1/user",userRouter);


app.listen(PORT,()=>{
  connectDB();
    console.log(`Server is running at port ${PORT}`);
});
