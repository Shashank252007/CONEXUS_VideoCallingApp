import express from "express";
import { ENV } from "./config/env.js";

const app = express();


app.listen(ENV.PORT , (req , res) => {
    console.log("Listening to port : ",ENV.PORT);
});

app.get('/' , (req , res) => {
    res.send("Hello World");
})
