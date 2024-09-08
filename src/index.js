import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'; // Add .js extension
import mongooseConnection from './config/mongoDB.js'; // Add .js extension

const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan('dev'));

dotenv.config();

const allowedOrigins = ['http://localhost:5173', 'https://kisanconnect-pi.vercel.app/'];

// Middleware to set headers
app.use(cors({
    origin:allowedOrigins,
    methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.set('trust proxy', 1);


app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongooseConnection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

export default app