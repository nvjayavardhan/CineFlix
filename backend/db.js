const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://nvjayavardhan:Vardhan123@cluster0.3snzdwg.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connection successful ra lucha");

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
