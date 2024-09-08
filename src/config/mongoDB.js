import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbURL = process.env.MONGODB_URL;

if (!dbURL) {
    console.error('MongoDB URL not found in environment variables');
    process.exit(1);
}

mongoose.connect(dbURL)
    .then(() => {
        console.log('Connected to MongoDB');
        
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    });

export default mongoose.connection