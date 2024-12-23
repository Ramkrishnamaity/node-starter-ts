import mongoose from "mongoose";

async function connectDB() {
    const mongoURL = process.env.MONGODB_URL ?? "mongodb://localhost:27017/";
    try {
        // mongodb connection
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected.");

    } catch (error) {
        console.error("Connection error:", error);
        process.exit(1);
    }
}

export { connectDB };