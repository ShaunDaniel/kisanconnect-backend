import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'; 
import productRoutes from './routes/productRoutes.js'; 
import mongooseConnection from './config/mongoDB.js'; 
import helmet from 'helmet';



const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan('dev'));

dotenv.config();

const allowedOrigins = ['http://localhost:5173', 'https://kisanconnect-pi.vercel.app'];

// helmet middleware for security headers
app.use(helmet()); 
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "validator.swagger.io"],
        childSrc: ["'none'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    }
}));

// Middleware to set headers
app.use(cors({
    origin:allowedOrigins,
    methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Connect to MongoDB
mongooseConnection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

export default app