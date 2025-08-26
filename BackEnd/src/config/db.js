import { ENV } from "./env.js";
import mongoose from "mongoose";

export const connectDB = async () => {

    try{
        const res =  await mongoose.connect(ENV.MONGO_URL);
        console.log("MongoDB connected Successfully ! : ",res.connection.host)
    }catch(err){
        console.error("Error at connecting to DB : ",err.message);
        process.exit(1);
    }
}