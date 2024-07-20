import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://piyushkumar26november:pishshpi143@cluster0.w27gteu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };