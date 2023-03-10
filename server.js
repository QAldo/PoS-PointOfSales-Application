import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/productsRoutes.js';
import userRouter from './routes/userRoutes.js';
import billsRouter from './routes/billsRoutes.js';

// require('colors');

dotenv.config();

//Connect with mongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("DB is connected!");
}).catch((err)=>{
    console.log(err.message);
});

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan("dev"))

//routes
// app.get("/", (req,res)=>{
//     res.send("Hello POS");
// })

app.use('/api/products/', productRouter);

app.use('/api/users/', userRouter);

app.use('/api/bills/', billsRouter);

// Create Port
const PORT = process.env.PORT || 8000;

//Listen
app.listen(PORT, ()=>{
    console.log(`Server is running on the port: http://localhost:${PORT}`);
})