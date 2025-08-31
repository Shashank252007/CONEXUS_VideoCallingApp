import '../instrument.mjs';
import express from "express";
import { ENV } from "./config/env.js";
import {connectDB} from "./config/db.js";
import {clerkMiddleware} from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js"
import chatRoutes from "./routes/chat.routes.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();

app.use(express.json()); // use to parse the json data
app.use(clerkMiddleware()); // use to add req.auth object

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use(cors({origin : "http://localhost:5173" , credentials : true})); 
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat" , chatRoutes);

app.get("/debug-sentry" , (req , res) => {
  throw new Error("Test Error Created");
})

Sentry.setupExpressErrorHandler(app);

app.get('/' , (req , res) => {
    res.send("Hello World , Back End is working");
});



export default app;

if (ENV.NODE_ENV !== "production") {
  const startServer = () => {
    try {
      app.listen(ENV.PORT, () => {
        console.log("Listening on port:", ENV.PORT);
        connectDB();
      });
    } catch (err) {
      console.error("Error starting the Server:", err);
      process.exit(1);
    }
  };

  startServer();
}







