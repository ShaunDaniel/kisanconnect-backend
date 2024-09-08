import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'; // Add .js extension
import mongooseConnection from './config/mongoDB.js'; // Add .js extension
import helmet from 'helmet'; 

const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan('dev'));

dotenv.config();
const allowedOrigins = [
    'http://localhost:5173',
    `${process.env.FRONTEND_URL}`,
    'https://kisanconnect-pi.vercel.app'    // Add this line
];

// Middleware
app.set('trust proxy', 1);
app.use(helmet()); // Apply helmet middleware for security headers
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
app.use(cors({
    origin: function(origin, callback){
        console.log(origin);
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        res.header('Access-Control-Allow-Origin', origin); // Set the allowed origin
        return callback(null, true);
    },
    credentials: true
}));


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