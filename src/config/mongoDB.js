const mongoose = require('mongoose');
require('dotenv').config();

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

    module.exports = mongoose.connection;