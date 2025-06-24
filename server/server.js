import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoute from './routes/User.js';
import studentRoute from './routes/Student.js';
import billsRoute from './routes/Bills.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connected!');
    })
    .catch((err) => {
        console.error('DB not connected:', err);
    });

// Basic route
app.get('/', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send(`
            <h1>Server is Started and Running</h1>
            <h1 style="color:green">Database connected successfully!!</h1>
        `);
    } else {
        res.send(`
            <h1>Server is Running</h1>
            <h1 style="color:red;">Database not connected! Check connection string</h1>
        `);
    }
});

// API routes
app.use('/api/auth', userRoute);
app.use('/api/student', studentRoute);
app.use('/api/bills', billsRoute);

// Start server
app.listen(process.env.PORT, () => {
    console.log('Server started at port', process.env.PORT);
});
