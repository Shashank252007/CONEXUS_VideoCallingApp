import express from "express";
import { ENV } from "./config/env.js";
import {connectDB} from "./config/db.js";
import {clerkMiddleware} from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js"


const app = express();

app.use(express.json()); // use to parse the json data
app.use(clerkMiddleware()); // use to add req.auth object

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));


const startServer = () => {
    try{
        if(ENV.NODE_ENV !== 'production'){
            app.listen(ENV.PORT , (req , res) => {
                console.log("Listening to port : ",ENV.PORT);
                connectDB();
            });
        }
    }catch(err){
        console.error("Error staring the Server : ",err);
        process.exit(1);
    }
};

app.get('/' , (req , res) => {
    res.send("Hello World , Back End is working");
});

startServer();

export default app;


