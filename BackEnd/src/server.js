import express from "express";
import { ENV } from "./config/env.js";
import {connectDB} from "./config/db.js"

const app = express();


app.listen(ENV.PORT , (req , res) => {
    console.log("Listening to port : ",ENV.PORT);
    connectDB();
});

app.get('/' , (req , res) => {
    res.send("Hello World");
})
