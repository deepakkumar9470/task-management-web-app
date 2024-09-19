import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDatabase from './db/db.js';
import authRoute from './routes/auth.js';
import taskRoute from './routes/task.js';

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  }));

app.use('/api/user', authRoute);
app.use('/api/task', taskRoute);

connectDatabase();

app.get('/', (req,res)=>{
    res.send('hello task management..')
})

// Handling global error
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server started at port http://localhost:${PORT}`);
});


