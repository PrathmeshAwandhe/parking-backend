import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {UserRouter} from "./Routes/UserRoute.js";
import {SpaceRouter} from "./Routes/SpaceRoute.js";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/auth",UserRouter);
app.use("/space",SpaceRouter);

mongoose.connect("mongodb+srv://awandheprathmesh:Panda789@cluster0.ump62.mongodb.net/").then(()=>{
    console.log("MongoDB connected");
}).catch((e)=>{
    console.log(e);
})



app.listen(4000,()=> console.log("Server running on port 4000"));